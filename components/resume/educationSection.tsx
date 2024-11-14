import React from "react";

type Education = {
  duration: string;
  institute: string;
  subject: string;
  result: string;
};

function EducationSection() {
  const Education: Education[] = [
    {
      duration: "Expected in 2025",
      institute: "University of Moratuwa",
      subject: "BSc (Hons.) in Information Technology",
      result: "CGPA - 3.18",
    },
    {
      duration: "2019",
      institute: "G.C.E. Advance Level",
      subject: "Physical Science Stream",
      result: "1 A , 2 B's",
    },
  ];
  return (
    <div>
      <div className="text-fontGray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <div className="max-w-xl mx-4 py-12">
        <div className="relative pl-8 py-4 border-l-4 border-white">
          <div className="mb-0 space-y-12">
            {Education.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="absolute -left-3 mt-1.5">
                  <div className="w-5 h-5 rounded-full bg-fontSecondary"></div>
                </div>
                <p className="text-fontSecondary mb-2">{item.duration}</p>
                <h3 className="text-2xl font-semibold">
                  {item.subject}
                </h3>
                <p className="text-lg mb-3">{item.institute}</p>
                <p className="text-lg text-fontGray">{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationSection;
