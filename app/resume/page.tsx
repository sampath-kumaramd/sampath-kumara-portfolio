"use client"
import Link from "next/link"
import React, { useState } from "react"
import ExperienceSection from "../../components/resume/experienceSection"
import EducationSection from "../../components/resume/educationSection"
import SkillsSection from "../../components/resume/skillsSection"
import VolunteeringSection from "../../components/resume/volunteeringSection"

type ResumeSubSection = {
    name: string,
    url: string,
    component: React.ComponentType
}

const HeroSection: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string | null>("Experience")

    const ResumeSubSection: ResumeSubSection[] = [
        { name: "Experience", url: '/experience', component: ExperienceSection },
        { name: "Education", url: '/education', component: EducationSection },
        { name: "Skills", url: '/skills', component: SkillsSection },
        { name: "Volunteering", url: '/volunteering', component: VolunteeringSection },
    ]

    return (
        <div className="container mx-auto pt-8 grid grid-cols-3 my-16 gap-24">
            <div className="col-span-1 space-y-12">
                <div className="text-5xl font-bold">Why hire me?</div>
                <div className="text-fontGray">Fast learning. <br/> Good communication.<br/>User friendly.</div>
                <div className="w-full flex flex-col gap-8">
                    {ResumeSubSection.map((item, index) => (
                        <div 
                            key={index} 
                            className={`rounded-xl py-3 px-5 w-full text-center cursor-pointer transition-colors ${
                                selectedSection === item.name 
                                ? 'bg-fontSecondary' 
                                : 'bg-bgSecondery hover:bg-fontSecondary'
                            }`}
                            onClick={() => setSelectedSection(item.name)}
                        >
                            <button className="text-xl">{item.name}</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-2">
                <h2 className="text-2xl font-bold mb-4">{selectedSection}</h2>
                {React.createElement(ResumeSubSection.find(item => item.name === selectedSection)?.component || ExperienceSection)}
            </div>
        </div>
    )
}

export default HeroSection