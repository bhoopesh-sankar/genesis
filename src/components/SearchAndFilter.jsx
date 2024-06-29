import React, { useState } from "react";
import { setGlobalState, useGlobalState } from "../store";
import { ProjectCard } from "./Projects";
import { truncate, daysRemaining } from "../store";
import { Link } from "react-router-dom";

const ComponentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [projects] = useGlobalState('projects')


  const components = projects;
  console.log(components);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredComponents = components.filter((component) => {
      return (
        component.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.prdname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.loc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredComponents(filteredComponents);
  };

  return (
    <div className="flex flex-col px-6 mb-7">
      <div style={{ paddingLeft: '43%'}}>
        <input style={{ border:'3px solid', borderRadius:'9px'}} type="text" placeholder="Search components" onChange={handleSearch} />
      </div>
      {filteredComponents.length > 0
        ? filteredComponents.map((component, index) => (
          // <li key={index}>
          <div className="pt-24 mb-5 px-6 flex justify-center">
            <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4" >
              <Link to={'/projects/' + component.id}>

                <div className="p-4">
                  <h5 style={{ fontWeight: 'bold', }}>Product: {truncate(component.prdname, 25, 0, 28)}</h5>
                  <div
                    className="flex justify-between items-center 
        font-bold mt-1 mb-2 text-gray-700"
                  >
                    <small className="flex justify-start items-center">
                      <span> <h5 style={{ fontWeight: 'bold', }}>Price/Kg: {component.cost} Deth</h5></span>
                    </small>
                  </div>
                  <h5 style={{ fontWeight: 'bold', }}>Location: {truncate(component.loc, 25, 0, 28)}</h5>
                </div>
              </Link>
            </div>
          </div>

          // </li>

        ))
        : components.map((component, index) => (
          // <li key={index}>
          <div className="flex flex-col px-6 mb-7">
            <div className="pt-24 mb-5 px-6 flex justify-center">
              <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4" >
                <Link to={'/projects/' + component.id}>

                  <div className="p-4">
                    <h5 style={{ fontWeight: 'bold', }}>Product: {truncate(component.prdname, 25, 0, 28)}</h5>
                    <div
                      className="flex justify-between items-center 
        font-bold mt-1 mb-2 text-gray-700"
                    >
                      <small className="flex justify-start items-center">
                        <span> <h5 style={{ fontWeight: 'bold', }}>Price/Kg: {component.cost} Deth</h5></span>
                      </small>
                    </div>
                    <h5 style={{ fontWeight: 'bold', }}>Location: {truncate(component.loc, 25, 0, 28)}</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>


          // </li>

        ))}
    </div>
  );
};

export default ComponentList;
