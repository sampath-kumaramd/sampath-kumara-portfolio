import React from 'react';
import { FaDotCircle } from 'react-icons/fa';

type Volunteer = {
  position: string;
  time: string;
  society: string;
};

function VolunteeringSection() {
  const Volunteer: Volunteer[] = [
    {
      position: 'Main Coordinator',
      time: 'Sep 2024 - Nov 2024',
      society: 'FIT Sixes 2K24 , ITFSU',
    },
    {
      position: 'Batch Coordinator',
      time: 'Jun 2023 - Jul 2024',
      society: 'EXMO - University of Moratuwa',
    },
    {
      position: 'Secretary',
      time: 'Jul 2022 - Jul 2023',
      society: "Students' Union, Faculty of IT, University of Moratuwa",
    },
    {
      position: 'Company Coordinator | FIT Future Careers 2022',
      time: 'Mar 2023',
      society: 'INTECS - University of Moratuwa',
    },
  ];
  return (
    <div>
      <div className="text-fontGray">
        The volunteering experiences that I have gained over the years have
        taught me the importance of teamwork, communication, and adaptability.
        These experiences have not only enhanced my skills but also shaped my
        approach to problem-solving and decision-making.
      </div>
      <div className="grid grid-rows-4 gap-6 pt-12">
        {Volunteer.map((item, index) => (
          <div key={index} className="flex gap-5 rounded-xl">
            <div>
              <FaDotCircle className="mt-2 text-Secondary" />
            </div>
            <div>
              <div className="flex gap-2">
                <div className="text-2xl">{item.position}</div>
              </div>
              <div className="mb-2 text-sm text-fontGray">{item.time}</div>
              <div className="">{item.society}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VolunteeringSection;
