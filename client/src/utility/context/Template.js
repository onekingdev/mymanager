import React, { createContext, useEffect, useState } from 'react';
import { setTemplateData } from '../Utils';

export const TemplateContext = createContext(null);

export const TemplateProvider = (props) => {
  const [elements, setElements] = useState([]);
  const [title, setTitle] = useState('My Manager');
  const [logo, setLogo] = useState(null);
    const [organization,setOrganization] = useState();

    useEffect(()=>{
        setOrganization(JSON.parse(localStorage.getItem('organization')))
    },[])
    
  useEffect(() => {
    if (organization) {
      if (organization?.logoLink && organization?.logoLink !== '') {
        setLogo(organization.logoLink);
      }
      setTitle(organization.name)
      const plan = organization.plan[organization.plan.length - 1];
      const planDetails = organization.planDetails.find((x) => x._id === plan.planId);
      setElements(setTemplateData(planDetails.permissions));
    }
  }, [organization]);

  return (
    <TemplateContext.Provider value={{ elements, setElements, title, setTitle, logo, setLogo }}>
      {props.children}
    </TemplateContext.Provider>
  );
};
