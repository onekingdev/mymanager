import { customInterIceptors } from '../../../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addSignInitialStamp = async (payload) => {
  try {
    const { data } = await API.post('/document-signature/signatures', payload);
    return data;
  } catch (error) {}
};

export const editSignatureStampInitial = async (
  signatureId,
  isSignature,
  isInitial,
  id,
  payload
) => {
  try {
    const { data } = await API.put(
      `/document-signature/signatures?signatureId=${signatureId}&isSignature=${isSignature}&id=${id}&isInitial=${isInitial}`,
      +signatureId,
      payload
    );
    return data;
  } catch (error) {}
};

export const getSignatureStampInitial = async (email) => {
  try {
  
    const { data } = await API.get(`/document-signature/signatures?email=${email}`);
    return data;
  } catch (error) {}
};
export const uploadSignatureStampInitial = async (payload) => {
  try {
    const { data } = await API.post('/document-signature/upload', payload);
    return data;
  } catch (error) {}
};

export const deleteSignatureStampInitial = async(payload) =>{
    try {
        const {data} = await API.delete('/document-signature/upload',payload);
        return data;
    } catch (error) {
        
    }
}

//delete signatures
