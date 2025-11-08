"use client"
import Hero from "@/components/Hero";
import GoalsMission from "@/components/GoalsMission";
import EducationalPrograms from '@/components/EducationalPrograms';
import EducationalPublications from '@/components/EducationalPublications';
import OurImpact from '@/components/OurImpact';
import ExamRegistration from '@/components/ExamRegistration';
import CheckExamResults from '@/components/CheckExamResults';
import AdminUploadExamResults from '@/components/AdminUploadExamResults';


export default function Home() {
  return (
    <div className="">
      <Hero />
      <GoalsMission />
      <EducationalPrograms />
      <EducationalPublications />
      <OurImpact />
      <ExamRegistration />
      <CheckExamResults />
      <AdminUploadExamResults />
    </div>
  );
}
