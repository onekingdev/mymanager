const { ObjectId } = require("mongodb");
const { Table, Workspace, TrackActivity, LastSeen } = require("../models/ProjectManager");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

//** Create Prject Management Workspace  */

exports.createProject = asyncHandler(async (req, res) => {
  try {
    let { name } = req.body;
    const {organization} = req.headers
    const user = req.user
    //console.log(name);
    const userID = req.user._id;
    if (!userID || !name) {
      return res.status(400).json({
        response: false,
        massage: "userID and workspace name are required to create new worksapce",
      });
    }

    let newWorksapce = new Workspace({
      userID,
      accessIDs: [],
      name,
      tables: [],
      organizationId:organization?mongoose.Types.ObjectId(organization):null,
      creatorType:organization?user.organizations.find(x=>x.organizationId.toString()===organization).userType:user.userType
    });

    await newWorksapce.save();
    
    Workspace.find({
      $or: [{ userID: userID , organizationId:organization?mongoose.Types.ObjectId(organization):null }, { accessIDs: { $in: userID , organizationId:organization?mongoose.Types.ObjectId(organization):null } }],
    })
      .populate("tables")
      .exec(async (error, result) => {
        if (error) {
          return res.status(400).json({
            success: false,
            massage: "Error while searching for data",
          });
        } else {
          res.status(200).json({ success: true, result });
        }
      });
  } catch (error) {
    res.status(500).json({
      respnse: false,
      massage: "Failed to create workspace",
    });
  }
})

exports.getProjects = asyncHandler(async (req, res) => {
  try {
    const id = req.query.id;
    let userID = req.user._id;
    const {organization} = req.headers;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "userID are required in the request body",
      });
    }
    Workspace.find({
      $or: [{ userID: id, organizationId:organization?mongoose.Types.ObjectId(organization):null }, { accessIDs: { $in: id } , organizationId:organization?mongoose.Types.ObjectId(organization):null }],
    })
      .populate("tables")
      .exec(async (error, result) => {
        if (error) {
          return res.status(400).json({
            success: false,
            massage: "Error while searching for data",
          });
        } else {
          res.status(200).json({ success: true, result });
        }
      });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
})

//** Delete workspace
exports.deleteProject = asyncHandler(async (req, res) => {
  try {
    let projectID = req.query.id;
    let userID = req.user._id;
    if (!projectID) {
      return res.status(400).json({
        success: false,
        message: "projectID are required",
      });
    }

    const deletedProject = await Workspace.findByIdAndDelete(projectID);
    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "The requested project management data could not be found.",
      });
    }
    // Delete all tables and Activity that belong to this workspace
    await Table.deleteMany({ _id: { $in: deletedProject.tables } });
    await TrackActivity.deleteMany({ workspaceID: projectID });
    const workspaces = await Workspace.find({
      $or: [{ userID: userID }, { accessIDs: { $in: [userID] } }],
    });
    return res.status(200).json({
      success: true,
      data: workspaces,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the project management data",
      error: err,
    });
  }
})

exports.updateProjectTitle = asyncHandler(async (req, res) => {
  try {
    let { projectTitle, workspaceID } = req.body;
    await Workspace.updateOne({ _id: workspaceID }, { $set: { name: projectTitle } }).then(
      (result) => {
        if (result) {
          return res.status(201).json({
            success: true,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating project title",
      error: err,
    });
  }
})

// //** Create new table
exports.addProjectManagement = asyncHandler(async (req, res) => {
  try {
    const { workspaceID, title } = req.body;
    let userID = req.user._id;
    let userName = req.user.firstName;
    if (!workspaceID || !userID || !title) {
      return res.status(400).json({
        success: false,
        message: "Faield to add new table",
      });
    }

    const newTable = new Table({
      workspaceID,
      userID,
      title,
      rowData: [],
    });
    let newRow = {
      task: "",
      manager: { userID: "", value: "" },
      status: { value: "" },
    };
    newTable.mapOrder = [
      { id: "_id", column: "_id", order: 1 },
      { id: "task", column: "Task", order: 2 },
      { id: "manager", column: "Manager", order: 3 },
      { id: "status", column: "Status", order: 4 },
    ];

    newTable.rowData.push(newRow);
    let tableAdded = await newTable.save();

    const workspace = await Workspace.findById(workspaceID);
    workspace.tables.push(tableAdded._id);
    await workspace.save();

    let newActivity = new TrackActivity({
      userID: userID,
      userName: userName,
      workspaceID: workspaceID,
      tableTitle: title,
      tableID: tableAdded._id,
      activity: "Group Created",
      current: title,
    });
    await newActivity.save();

    return res.status(201).json({
      success: true,
      data: tableAdded,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the New Table",
      error: err,
    });
  }
})

// //** Update Table data
exports.updateDynamicColumnFields = asyncHandler(async (req, res) => {
  try {
    const { tableID, rowID, value, columnName } = req.body;
    let userID = req.user._id;
    let userName = req.user.firstName;
    let changesMade = false;
    const table = await Table.findById(tableID);
    const row = table.rowData.find((r) => r._id == rowID);
    if (!table && !row) {
      return res.status(404).json({ error: "Table or Row not found" });
    }
    const activityData = {
      userID: userID,
      userName: userName,
      workspaceID: table.workspaceID,
      tableID: tableID,
      column: columnName,
      task: row["task"],
      activity: "Row data updated",
    };
    row.dynamicProperties.forEach((item) => {
      if (item.columnName === columnName) {
        activityData.previous = item.value;
        activityData.current = value;
        item["value"] = value;
        changesMade = true;
      }
    });
    if (changesMade) {
      await table.save();
      await TrackActivity.create(activityData);
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "unable to update column name" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
})
// //** Update Table data
exports.updateProjectManagement = asyncHandler(async (req, res) => {
  try {
    const { tableID, rowID, title, rowData, columnName } = req.body;
    let userID = req.user._id;
    let userName = req.user.firstName;

    const table = await Table.findById(tableID);

    const row = table.rowData.find((r) => r._id == rowID);
    if (!table && !row) {
      return res.status(404).json({ error: "Table or Row not found" });
    }

    if (rowData && columnName) {
      const activityData = {
        userID: userID,
        userName: userName,
        workspaceID: table.workspaceID,
        tableID: tableID,
        column: columnName,
        task: row["task"],
        activity: "Row data updated",
      };
      if (columnName === "Due") {
        activityData.previous = row[columnName.toLowerCase()];
        activityData.current = rowData[0];
        await TrackActivity.create(activityData);
        row[columnName.toLowerCase()] = rowData;
      } else if (columnName === "Assignee") {
        const previousPeople = row.assignee || [];
        const currentPeople = rowData || [];
        const newPerson = currentPeople.find(
          (person) => !previousPeople.find((prevPerson) => prevPerson.userID === person.userID)
        )?.value;
        const missingPerson = previousPeople.find(
          (person) => !currentPeople.find((currPerson) => currPerson.userID === person.userID)
        )?.value;
        activityData.added = newPerson;
        activityData.deleted = missingPerson;
        await TrackActivity.create(activityData);
        row.assignee = currentPeople;
      } else if (["Manager", "Status"].includes(columnName)) {
        activityData.previous = row[columnName.toLowerCase()]?.value;
        activityData.current = rowData?.value;
        await TrackActivity.create(activityData);
        row[columnName.toLowerCase()] = rowData;
      } else if (["Task"].includes(columnName)) {
        activityData.previous = row[columnName.toLowerCase()];
        activityData.current = rowData;
        await TrackActivity.create(activityData);
        row[columnName.toLowerCase()] = rowData;
      } else {
        table.rowData.forEach((indexRow) => {
          indexRow.dynamicProperties.forEach(async (property) => {
            if (property.columnName === columnName) {
              property.value = rowData;
            }
          });
        });
      }
    }

    // Update the row title
    if (title) {
      let newActivity = new TrackActivity({
        userID: userID,
        userName: userName,
        workspaceID: table.workspaceID,
        tableID: tableID,
        tableTitle: title,
        activity: "Table title updated",
        previous: table.title,
        current: title,
      });
      await newActivity.save();
      table.title = title;
    }

    await table.save();
    // Send the updated row data to the client
    res.json({ success: true, row });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
})

//** Add a new new in the table
exports.addRowProjectManagement = asyncHandler(async (req, res) => {
  try {
    const { tableID } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;
    if (!tableID || !userID) {
      return res.status(400).json({
        success: false,
        message: "Faield to add new row",
      });
    }

    const table = await Table.findById(tableID);

    if (!table) {
      return res.status(404).json({ message: "table not found" });
    }
    let newRow = {};
    if (!table.rowData || table.rowData < 1) {
      newRow = {
        task: "",
        manager: { userID: "", value: "" },
        status: { value: "" },
      };
      table.mapOrder = [
        { id: "_id", column: "_id", order: 1 },
        { id: "task", column: "Task", order: 2 },
        { id: "manager", column: "Manager", order: 3 },
        { id: "status", column: "Status", order: 4 },
      ];
    }

    if (table.rowData && table.rowData.length >= 1) {
      const existingRow = table.rowData[0];
      const getProperties = JSON.parse(JSON.stringify(existingRow));
      delete getProperties._id;
      Object.keys(getProperties).forEach((key) => {
        if (key === "task") {
          newRow[key] = "";
        }
        if (key === "manager") {
          newRow[key] = { userID: "", value: "" };
        }
        if (key === "assignee") {
          newRow[key] = [{ userID: "", value: "" }];
        }
        if (key === "due") {
          newRow[key] = new Date();
        }
        if (key === "status") {
          newRow[key] = "";
        }
      });
      if (existingRow.dynamicProperties) {
        newRow["dynamicProperties"] = [];
        existingRow.dynamicProperties.forEach((property) => {
          newRow.dynamicProperties.push({
            columnName: property.columnName,
            columnType: property.columnType,
          });
        });
        isColumnAdded = true;
      }
    }
    const newAddedRow = { ...newRow, _id: new ObjectId() };
    table.rowData.push(newAddedRow);
    let updatedTable = await table.save();
    let newActivity = new TrackActivity({
      userID: userID,
      userName: userName,
      tableTitle: table.title,
      workspaceID: table.workspaceID,
      tableID: tableID,
      activity: "Added new row",
    });

    await newActivity.save();
    res.status(200).json({
      success: true,
      msg: "New row added successfully",
      data: updatedTable,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add new row" });
  }
})

// //** Add a new Column in the table
exports.addColumnProjectManagement = asyncHandler(async (req, res) => {
  try {
    const { tableID, columns } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;

    let isColumnAdded = false;
    if (!tableID || !Array.isArray(columns)) {
      return res.status(400).json({
        success: false,
        message: "tableID and an array of columns are required in the request body",
      });
    }
    const table = await Table.findById(tableID);

    if (!table) {
      return res.status(404).json({ success: false, massage: "Table not found" });
    }
    let { rowData } = table;
    for (let i = 0; i < columns.length; i++) {
      isColumnAdded = false;
      const { columnName, columnType, category } = columns[i];
      let newColumnName = columnName;

      let columnID;
      if (category === "dynamic") {
        columnID = new ObjectId();
      } else {
        columnID = columnName.toLowerCase() + new Date();
      }
      if (!columnType || !columnName) {
        return res.status(400).json({
          success: false,
          message: "Each column must have a name and a type",
        });
      }
      if (category === "dynamic") {
        rowData.forEach((row) => {
          if (!row.dynamicProperties) {
            row.dynamicProperties = [];
          }
          let columnsNames = table.mapOrder.map((item) => item.column);
          let counter = 1;
          while (columnsNames.includes(newColumnName)) {
            newColumnName = columnName + " " + counter;
            counter++;
          }
          row.dynamicProperties.push({
            columnName: newColumnName,
            columnType: columnType,
            _id: columnID,
          });
        });

        isColumnAdded = true;
      } else {
        const getProperties = JSON.parse(JSON.stringify(rowData[0]));
        let existingColumn = Object.keys(getProperties);
        if (existingColumn.includes([newColumnName.toLowerCase()])) {
          return res.status(400).json({
            success: false,
            message: "Column with the same name already exists",
          });
        }

        rowData.forEach((row) => {
          switch (columnName.toLowerCase()) {
            case "task":
              row[columnName.toLowerCase()] = "";
              break;
            case "manager":
              row[columnName.toLowerCase()] = { userID: "", value: "" };
              break;
            case "status":
              row[columnName.toLowerCase()] = "";
              break;
            case "assignee":
              row[columnName.toLowerCase()] = [{ userID: "", value: "" }];
              break;
            case "due":
              row[columnName.toLowerCase()] = new Date();
              break;
            default:
              break;
          }
        });
        isColumnAdded = true;
      }
      if (isColumnAdded) {
        table.mapOrder.push({
          id: columnID,
          column: newColumnName,
          columnType: columnType,
          order: table.mapOrder.length + 1,
        });
        let newActivity = new TrackActivity({
          userID: userID,
          userName: userName,
          workspaceID: table.workspaceID,
          tableID: tableID,
          tableTitle: table.title,
          column: newColumnName,
          activity: "Added new column",
          current: columns.map((col) => col.columnName).join(", "),
        });

        await newActivity.save();
      }
    }
    table.rowData = rowData;

    let updatedTable = await table.save();
    res.status(200).json({
      success: true,
      data: updatedTable,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add new columns" });
  }
})

exports.updateColumnName = asyncHandler(async (req, res) => {
  try {
    const { tableID, columnName, mapOrderID } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;
    const table = await Table.findById(tableID);
    let prevColumnName = "";
    if (!table) {
      return res.status(404).json({ message: "table not found" });
    }

    let isColumnExist = table.rowData[0].dynamicProperties.some(
      (column) => column.columnName === columnName
    );
    if (isColumnExist) {
      return res.status(404).json({ message: "column Name already exist" });
    }

    for (const item of table.mapOrder) {
      if (item._id == mapOrderID) {
        prevColumnName = item.column;
        item.column = columnName;
        break;
      }
    }

    let { rowData } = table;
    let changesMade = false;
    rowData.forEach((row) => {
      if (row.dynamicProperties && row.dynamicProperties.length > 0) {
        row.dynamicProperties.forEach((property) => {
          if (property.columnName === prevColumnName) {
            property.columnName = columnName;
            changesMade = true;
          }
        });
      }
    });
    if (changesMade) {
      let newActivity = new TrackActivity({
        userID: userID,
        userName: userName,
        workspaceID: table.workspaceID,
        tableTitle: table.title,
        tableID: tableID,
        activity: "Column Name updated",
        current: columnName,
        column: columnName,
        previous: prevColumnName,
      });

      await newActivity.save();
      await table.save();
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "unable to update column name" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
})

exports.updateColumnOrder = asyncHandler(async (req, res) => {
  try {
    const { tableID, updatedMapOrder } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;

    if (!tableID && !columnType && !userID) {
      return res.status(400).json({
        success: false,
        message: "tableID and Column type are required in the request body",
      });
    }
    const table = await Table.findById(tableID);
    if (!table) {
      return res.status(404).json({ success: false, massage: "Table not found" });
    }
    table.mapOrder = [...updatedMapOrder];
    let newActivity = new TrackActivity({
      userID: userID,
      userName: userName,
      workspaceID: table.workspaceID,
      tableTitle: table.title,
      tableID: tableID,
      activity: "Column order updated",
    });

    await newActivity.save();
    await table.save();
    res.json({ success: true, updatedMapOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
})

// //** Delete Table
exports.deleteTableProjectManagement = asyncHandler(async (req, res) => {
  try {
    const { tableID, workspaceID } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;
    if (!tableID) {
      return res.status(400).json({
        success: false,
        message: "tableID are required in the request body",
      });
    }

    const deletedTable = await Table.findByIdAndDelete(tableID);
    if (!deletedTable) {
      return res.status(404).json({
        success: false,
        message: "The requested project management data could not be found.",
      });
    }

    let newActivity = new TrackActivity({
      userID: userID,
      userName: userName,
      // tableTitle: deletedTable.title,
      workspaceID: workspaceID,
      tableID: tableID,
      column: deletedTable.title,
      activity: "Delete Table",
    });

    await newActivity.save();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the project management data",
      error: err,
    });
  }
})

// //** Delete Row('s)
exports.deleteRowProjectManagement = asyncHandler(async (req, res) => {
  try {
    const { workspaceID, tableID, rowIDs } = req.body;
    let userID = req.user._id;
    let userName = req.user.firstName;
    if (!tableID || !rowIDs || rowIDs.length < 1 || !userID) {
      return res.status(400).json({
        success: false,
        message: "userID TableID and rowID are required in the request body",
      });
    }
    let table = Table.find(tableID);
    const findTable = { _id: tableID };
    const rowsTobeDelete = { $pull: { rowData: { _id: { $in: rowIDs } } } };
    let result = await Table.updateOne(findTable, rowsTobeDelete);

    if (result.modifiedCount > 0) {
      let newActivity = new TrackActivity({
        userID: userID,
        userName: userName,
        workspaceID: workspaceID,
        tableID: tableID,
        tableTitle: table.title,
        activity: "Row deleted",
      });
      await newActivity.save();
      res.status(200).json({
        success: true,
        message: "The rowData objects were successfully deleted",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No matching rowData objects were found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting Row",
      error: err,
    });
  }
})

// //** Delete Column

exports.deleteColumnProjectManagement = asyncHandler(async (req, res) => {
  try {
    const { columnName, tableID } = req.body;
    let userName = req.user.firstName;
    let userID = req.user._id;

    let staticColumns = ["task", "manager", "status", "assignee", "due"];
    let table = await Table.findById(tableID);

    let newActivity = new TrackActivity({
      userID: userID,
      userName: userName,
      workspaceID: table.workspaceID,
      tableID: tableID,
      tableTitle: table.title,
      column: columnName,
      activity: "Column deleted",
    });
    if (staticColumns.includes(columnName.toLowerCase())) {
      const update = { [`$unset`]: { [`rowData.$[].${columnName}`]: 1 } };
      let updatedMapOrder = table.mapOrder.filter(
        (obj) => obj.column.toLowerCase() !== columnName.toLowerCase()
      );
      table.mapOrder = [...updatedMapOrder];
      await Promise.all([table.save(), Table.updateOne({ _id: tableID }, update)]);
      await newActivity.save();
      return res.json({
        success: true,
        message: "Column deleted successfully",
        data: table,
      });
    } else {
      let updatedRowData = await Promise.all(
        table.rowData.map(async (row) => {
          let dynamicProperties = row.dynamicProperties.filter(
            (prop) => prop.columnName.toLowerCase() !== columnName.toLowerCase()
          );
          return { ...row.toObject(), dynamicProperties };
        })
      );
      table.rowData = updatedRowData;
      let updatedMapOrder = table.mapOrder.filter(
        (obj) => obj.column.toLowerCase() !== columnName.toLowerCase()
      );
      table.mapOrder = [...updatedMapOrder];
      await Promise.all([table.save()]);
      await newActivity.save();
      return res.json({
        success: true,
        message: "Column deleted successfully",
        data: table,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting Row",
      error: error,
    });
  }
})
exports.ActivityAndLastSeen = asyncHandler(async (req, res) => {
  try {
    const id = req.query.id;
    let latestActivitiese = await TrackActivity.find({ workspaceID: id });
    let workspace = await Workspace.findOne({ _id: id });

    let workspaceMembers = [workspace.userID, ...workspace.accessIDs];
    let lastSeen = await LastSeen.find({ userID: { $in: workspaceMembers } });
    if (latestActivitiese || lastSeen) {
      return res.json({
        success: true,
        latestActivitiese,
        lastSeen,
      });
    } else {
      return res.json({
        success: false,
        message: "An error occurred while fetching data",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occurred while fetching data",
      error: error,
    });
  }
})
