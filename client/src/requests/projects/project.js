/*    eslint-disable */
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

//** Create new Project
export async function createProject(payload) {
  try {
    const response = await API.post(ENDPOINTS.CREATE_PROJECT, payload);
    if (response?.data.success === true) {
      toast.success('New workspace created successfully!');
      return response;
    } else {
      toast.error('Failed to create a workspace!');
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}

//** Get Projects Data
export async function getProjects(id) {
  try {
    const response = await API.get(ENDPOINTS.GET_PROJECTS + id);
    if (response?.data.success === true) {
      return response;
    } else {
      toast.error('Failed to load data!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}


//** Delete Project
export async function deleteProject(id) {
  try {
    console.log(id,"getProjects")
    const response = await API.delete(ENDPOINTS.DELETE_PROJECT + id);
    if (response?.data.success === true) {
      toast.success('Workspace deleted successfully!');
      return response;
    } else {
      toast.error('Failed to deleted workspace!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}


//** Get tables Data
export async function getTableData(id) {
  try {
    const response = await API.get(ENDPOINTS.GET_TABLES + id);
    if (response?.data.success === true) {
      return response;
    } else {
      toast.error('Failed to load data!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Update Project(Workspace) Name
export async function updateProject(payload) {
  try {
    const response = await API.put(ENDPOINTS.UPDATE_PROJECT, payload);
    if (response?.data.success === true) {
      toast.success('Project title updated successfully!');
      return response;
    } else {
      toast.error('Project title update failed!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}


//** Create new Table
export async function createNewTable(payload) {
  try {
    const response = await API.post(ENDPOINTS.CREATE_NEW_TABLE, payload);
    if (response?.data.success === true) {
      toast.success('New project created successfully!');
      return response;
    } else {
      toast.error('Failed to create a project!');
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}

//** Update Table Data
export async function updateTable(payload) {
  try {
    const response = await API.put(ENDPOINTS.UPDATE, payload);
    if (response?.data.success === true) {
      toast.success('Data updated successfully!');
      return response;
    } else {
      toast.error('Data update failed!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Add new row on table
export async function addRow(payload) {
  try {
    const response = await API.post(ENDPOINTS.ADD_ROW, payload);

    if (response?.data.success === true) {
      toast.success('New task added successfully!');
      return response;
    } else {
      toast.error('Failed to add a new task!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Add new Column
export async function addColumn(payload) {
  try {
    const response = await API.post(ENDPOINTS.ADD_COLUMN, payload);
    if (response?.data.success === true) {
      toast.success('New Column(s) added successfully!');
      return response;
    } else {
      toast.error('Failed to add a new column!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** update Column Name
export async function updateColumn(payload) {
  try {
    const response = await API.put(ENDPOINTS.UPDATE_COLUMN, payload);
    if (response?.data.success === true) {
      toast.success('Column name updated successfully!');
      return response;
    } else {
      toast.error('Failed to update column name!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}


//** update Dynamic Column Fields
export async function updateDynamicColumnFields(payload) {
  try {
    const response = await API.put(ENDPOINTS.UPDATE_DYNAMIC_FIELDS, payload);
    if (response?.data.success === true) {
      toast.success('Data updated successfully!');
      return response;
    } else {
      toast.error('Failed to update data!');
    }
  } catch (error) {
    console.log(error,'payload')
    toast.error('Please try again later!');
  }
}
//** update Column Name
export async function updateColumnOrder(payload) {
  try {
    const response = await API.put(ENDPOINTS.UPDATE_COLUMN_ORDER, payload);
    if (response?.data.success === true) {
      toast.success('Column order updated successfully!');
      return response;
    } else {
      toast.error('Failed to update column order!');
    }
  } catch (error) {
    console.log(error,'payload')
    toast.error('Please try again later!');
  }
}


//** Delete table
export async function deleteTable(payload) {
  try {
    const response = await API.delete(ENDPOINTS.DELETE_TABLE, payload);
    if (response?.data.success === true) {
      toast.success('Project deleted successfully!');
      return response;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Delete row('s) from table
export async function deleteRow(payload) {
  try {
    const response = await API.delete(ENDPOINTS.DELETE_ROW, payload);

    if (response?.data.success === true) {
      toast.success('Task(s) deleted successfully!');
      return response;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Delete row('s) from table
export async function deleteColumn(payload) {
  try {
    const response = await API.delete(ENDPOINTS.DELETE_COLUMN, payload);

    if (response?.data.success === true) {
      toast.success('Column deleted successfully!');
      return response;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}


export async function getActivity_LastSeen(id) {
  try {
    const response = await API.get(ENDPOINTS.GET_ACTIVITY_LAST_SEEN + id);
    if (response?.data.success === true) {
      return response;
    } else {
      toast.error('Failed to load data!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}