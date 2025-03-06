import React from "react";
import "./FlowDiagram.css";
import { Users } from 'lucide-react';

interface GroupBox {
    name: string;
    numberOfPerson: number;
    subGroup?: GroupBox[];
}

const FlowDiagram: React.FC = () => {
    const groupBox: GroupBox[] = [
        {
            name: "Group A",
            numberOfPerson: 1,
        },
        {
            name: "Group B",
            numberOfPerson: 2,
            subGroup: [
                {
                    name: "Group B1",
                    numberOfPerson: 1,
                },
                {
                    name: "Group B2",
                    numberOfPerson: 1,
                },
            ],
        },
        {
            name: "Group C",
            numberOfPerson: 3,
        },
    ];

    return (
        <div>
            {groupBox.map((group, index) => (
                <div key={index} className="flow-container">
                    {/* Start Point */}
                    <svg className="connector">
                        <circle cx="12" cy="25" r="8" fill="white" stroke="#006b42" strokeWidth="5"></circle>
                        <line x1="20" y1="25" x2="100" y2="25" stroke="#006b42" strokeWidth="3"></line>
                    </svg>

                    {/* Content Box */}
                    <div className="group-container">
                        <div className="group-box">
                            <div className="group-header">
                                <span className="group-icon"><Users /></span>
                                <span className="group-title">{group.name}</span>
                            </div>
                            <div className="group-content">
                                {group.numberOfPerson} person{group.numberOfPerson > 1 ? "s" : ""} in this group
                            </div>
                        </div>

                        {/* Subgroups & Curved Lines */}
                        {group.subGroup && (
                            <>
                                <svg className="subgroup-connector">
                                    <path
                                        d="M 100 25 C 140 25, 140 70, 180 70"
                                        stroke="#006b42"
                                        strokeWidth="3"
                                        fill="transparent"
                                    ></path>
                                    {/* Curved line from Group B to Subgroup B2 */}
                                    <path
                                        d="M 100 25 C 140 25, 140 -20, 180 -20"
                                        stroke="#006b42"
                                        strokeWidth="3"
                                        fill="transparent"
                                    ></path>
                                </svg>
                                <div className="sub-group-container">
                                    {group.subGroup.map((sub, subIndex) => (
                                        <div key={subIndex} className="sub-group-and-end-point-container">
                                            <div key={subIndex} className="group-box sub-group">
                                                <div className="group-header">
                                                    <span className="group-icon"><Users /></span>
                                                    <span className="group-title">{sub.name}</span>
                                                </div>
                                                <div className="group-content">
                                                    {sub.numberOfPerson} person{sub.numberOfPerson > 1 ? "s" : ""} in this group
                                                </div>
                                            </div>
                                            <svg className="connector">
                                                <line x1="0" y1="25" x2="80" y2="25" stroke="#006b42" strokeWidth="3"></line>
                                                <rect x="80" y="18" width="15" height="15" stroke="#006b42" strokeWidth="5" fill="white"></rect>
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </>

                        )}
                    </div>

                    {/* End Point */}
                    {!group.subGroup && (
                        <svg className="connector">
                            <line x1="0" y1="25" x2="80" y2="25" stroke="#006b42" strokeWidth="3"></line>
                            <rect x="80" y="18" width="15" height="15" stroke="#006b42" strokeWidth="5" fill="white"></rect>
                        </svg>
                    )}

                </div>
            ))}
        </div>
    );
};

export default FlowDiagram;
