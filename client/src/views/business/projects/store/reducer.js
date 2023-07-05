import { createSlice } from '@reduxjs/toolkit';

export const projectManagement = createSlice({
  name: 'projectManagement',
  initialState: {
    getProjects: [],
    projectsData: [],
    projectActivities: [],
    projectLastSeen: [],
  },
  reducers: {

    projectActivities: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length === 1 && !action.payload[0]) {
        state.projectActivities = [];
      } else {
        state.projectActivities = action.payload;
      }
    },
    projectLastSeen: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length === 1 && !action.payload[0]) {
        state.projectLastSeen = [];
      } else {
        state.projectLastSeen = action.payload;
      }
    },
    getProjectsData: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length === 1 && !action.payload[0]) {
        state.getProjects = [];
      } else {
        state.getProjects = action.payload;
      }
    },
    projectsData: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length === 1 && !action.payload[0]) {
        state.projectsData = [];
      } else {
        state.projectsData = action.payload;
      }
    },
    workspaceDelete: (state, action) => {
      const { workspaceID } = action.payload;

      // Filter out the workspace with the specified ID
      const updatedProjectsData = state.projectsData.filter((workspace) => workspace._id !== workspaceID);

      return {
        ...state,
        projectsData: updatedProjectsData,
      };
    }, 
    workspaceUpdateName: (state, action) => {
      const { workspaceID, projectTitle } = action.payload;

      // Find the workspace with the specified ID and update its name
      const updatedProjectsData = state.projectsData.map((workspace) => {
        if (workspace._id === workspaceID) {
          return { ...workspace, name: projectTitle };
        }
        return workspace;
      });

      return {
        ...state,
        projectsData: updatedProjectsData,
      };
    },

    addTable: (state, action) => {
      const { workspaceID, newTable } = action.payload;

      const updatedProjectsData = state.projectsData.map((workspace) => {
        if (workspace._id === workspaceID) {
          return {
            ...workspace,
            tables: [...workspace.tables, newTable]
          };
        } else {
          return JSON.parse(JSON.stringify(workspace));
        }
      });
      return {
        ...state,
        projectsData: updatedProjectsData,
      }

    },
    tableDelete: (state, action) => {
      const { workspaceID, tableID } = action.payload;
      const updatedProjectsData = state.projectsData.map((workspace) => {
        if (workspace._id === workspaceID) {
          const updatedTables = workspace.tables.filter((table) => table._id !== tableID);
          return {
            ...workspace,
            tables: updatedTables,
          };
        } else {
          return JSON.parse(JSON.stringify(workspace));
        }
      });

      return {
        ...state,
        projectsData: updatedProjectsData,
      };
    },
    rowAdd: (state, action) => {
      const { workspaceID, tableID, data } = action.payload;

      const updatedProjectsData = state.projectsData.map((workspace) => {
        if (workspace._id === workspaceID) {
          const updatedTables = workspace.tables.map((table) => {
            if (table._id === tableID) {
              return data;
            } else {
              return table;
            }
          });
          return {
            ...workspace,
            tables: updatedTables,
          };
        } else {
          return workspace;
        }
      });

      return {
        ...state,
        projectsData: updatedProjectsData,
      };
    },
    rowsDelete: (state, action) => {
      const { workspaceID, tableID, rowIDs } = action.payload;

      const updatedProjectsData = state.projectsData.map((workspace) => {
        if (workspace._id === workspaceID) {
          const updatedTables = workspace.tables.map((table) => {
            if (table._id === tableID) {
              let updatedRowData = table.rowData.filter(row => !rowIDs.includes(row._id));
              console.log(updatedRowData, "updatedRowData")
              return {
                ...table,
                rowData: [...updatedRowData],
              };
            }
            return table;
          });
          return { ...workspace, tables: updatedTables };
        }
        return workspace;
      });

      return { ...state, projectsData: updatedProjectsData };
    },
    updatedTableColumn: (state, action) => {
      const { workspaceID, tableID, updatedTable } = action.payload;
      const updatedProjectsData = state.projectsData.map(workspace => {
        if (workspace._id === workspaceID) {
          const updatedTables = workspace.tables.map(table => {
            if (table._id === tableID) {
              return updatedTable;
            } else {
              return table;
            }
          });
          return {
            ...workspace,
            tables: updatedTables,
          };
        } else {
          return workspace;
        }
      });

      return {
        ...state,
        projectsData: updatedProjectsData,
      };
    },

    updatedColumnOrder: (state, action) => {
      const { workspaceID, tableID, updatedMapOrder } = action.payload;
      const updatedProjectsData = state.projectsData.map(workspace => {
        if (workspace._id === workspaceID) {
          const updatedTables = workspace.tables.map(table => {
            if (table._id === tableID) {
              return {...table , mapOrder: updatedMapOrder};
            } else {
              return table;
            }
          });
          return {
            ...workspace,
            tables: updatedTables,
          };
        } else {
          return workspace;
        }
      });

      return {
        ...state,
        projectsData: updatedProjectsData,
      };
    },

    updateRow: (state, action) => {
      const { workspaceID, tableID, rowID, updatedRow } = action.payload;

      const updatedProjectsData = state.projectsData.map(workspace => {
        if (workspace._id === workspaceID) {
          const updatedTables = workspace.tables.map(table => {
            if (table._id === tableID) {
              const updatedRows = table.rowData.map(row => {
                if (row._id === rowID) {
                  return updatedRow
                } else {
                  return row;
                }
              });
              return { ...table, rowData: updatedRows };
            } else {
              return table;
            }
          });
          return { ...workspace, tables: updatedTables };
        } else {
          return workspace;
        }
      });

      return { ...state, projectsData: updatedProjectsData };
    },

  },
});
export const {updatedColumnOrder,workspaceUpdateName, updateRow, projectActivities, projectLastSeen, getProjectsData, projectsData, addTable, tableDelete, rowAdd, rowsDelete, updatedTableColumn, workspaceDelete } = projectManagement.actions;

export default projectManagement.reducer;
