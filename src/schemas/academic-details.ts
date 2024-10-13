import { z } from "zod";

export const academicSchema = z.object({
  qualification: z.string().min(1, { message: "Qualification is required" }),
  aicteFacultyId: z
    .string()
    .min(1, { message: "AICTE Faculty ID is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  level: z.string().min(1, { message: "Level is required" }),
});

export const teachingExperienceDrAITSchema = z.object({
  dateOfJoining: z.coerce.date({ message: "Date of joining is required" }),
  designationOnJoining: z
    .string()
    .min(1, { message: "Designation on joining is required" }),
});

export const previousTeachingExperienceSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    instituteName: z.string().min(1, { message: "Institution is required" }),
    fromDate: z.coerce.date({ message: "From date is required" }),
    toDate: z.coerce.date({ message: "To date is required" }),
  })
);

export const teachingExperienceIndustrySchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    organization: z.string().min(1, { message: "Organization is required" }),
    fromDate: z.coerce.date({ message: "Designation on joining is required" }),
    toDate: z.coerce.date({ message: "Date of leaving is required" }),
    designation: z
      .string()
      .min(1, { message: "Designation on leaving is required" }),
  })
);

export const teachingExperienceResearchSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    organization: z.string().min(1, { message: "Organization is required" }),
    fromDate: z.coerce.date({ message: "Designation on joining is required" }),
    toDate: z.coerce.date({ message: "Date of leaving is required" }),
    designation: z
      .string()
      .min(1, { message: "Designation on leaving is required" }),
  })
);

export const areaOfSpecializationSchema = z.object({
  subjectsTaught: z.string().min(1, { message: "Subjects taught is required" }),
  program: z.string().min(1, { message: "Program is required" }),
  noOfTimes: z.string().min(1, { message: "Level is required" }),
});

export const eventsAttendedSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    typeOfEvent: z.string().min(1, { message: "Type of event is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    fromDate: z.coerce.date({ message: "From date is required" }),
    toDate: z.coerce.date({ message: "To date is required" }),
    organizer: z.string().min(1, { message: "Organizer is required" }),
    venueOfEvent: z.string().min(1, { message: "Venue of event is required" }),
  })
);

export const eventsOrganizedSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    typeOfEvent: z.string().min(1, { message: "Type of event is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    fromDate: z.coerce.date({ message: "From date is required" }),
    toDate: z.coerce.date({ message: "To date is required" }),
    sponsor: z.string().min(1, { message: "Organizer is required" }),
    venueOfEvent: z.string().min(1, { message: "Venue of event is required" }),
    targetAudience: z
      .string()
      .min(1, { message: "Target audience is required" }),
  })
);

export const invitedTalksSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    typeOfEvent: z.string().min(1, { message: "Type of event is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    fromDate: z.coerce.date({ message: "From date is required" }),
    toDate: z.coerce.date({ message: "To date is required" }),
    organizer: z.string().min(1, { message: "Organizer is required" }),
    venueOfEvent: z.string().min(1, { message: "Venue is required" }),
    targetAudience: z
      .string()
      .min(1, { message: "Target audience is required" }),
  })
);

export const publicationsSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    typeOfPublication: z.enum(["Journal", "Conference"], {
      message: "Please select a type of publication",
    }),
    n_In: z.string().min(1, { message: "N/IN is required" }),
    nameOfJournal: z
      .string()
      .min(1, { message: "Name of journal is required" }),
    volumeAndPage: z
      .string()
      .min(1, { message: "Volume and page is required" }),
    doi: z.string().min(1, { message: "DOI is required" }),
    impactFactor: z.string().min(1, { message: "Impact factor is required" }),
  })
);

export const responsibilitiesSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    additionalResponsibilitiesHeld: z
      .string()
      .min(1, { message: "Additional responsibilities is required" }),
    fromDate: z.coerce.date({ message: "From date is required" }),
    toDate: z.coerce.date({ message: "To date is required" }),
  })
);

export const extracurricularsSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    typeOfEvent: z.string().min(1, { message: "Type of event is required" }),
    titleOfEvent: z.string().min(1, { message: "Title of event is required" }),
    fromDate: z.coerce.date({ message: "From date is required" }),
    toDate: z.coerce.date({ message: "To date is required" }),
    organizer: z.string().min(1, { message: "Organizer is required" }),
    level: z.string().min(1, { message: "Level is required" }),
    achievement: z.string().min(1, { message: "Achievement is required" }),
  })
);

export const outreachSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    activity: z.string().min(1, { message: "Activity is required" }),
    role: z.string().min(1, { message: "Role is required" }),
    fromDate: z.coerce.date({ message: "From date is required" }),
    toDate: z.coerce.date({ message: "To date is required" }),
    place: z.string().min(1, { message: "Place is required" }),
  })
);

export const recognitionsSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    recognitionRecieved: z
      .string()
      .min(1, { message: "Recognition recieved is required" }),
  })
);

export const awardsSchema = z.array(
  z.object({
    slNo: z.string().min(1, { message: "Serial number is required" }),
    awardRecieved: z.string().min(1, { message: "Award recieved is required" }),
  })
);

export const facultyAcademicDetailsSchema = z.object({
  academicSchema,
  previousTeachingExperienceSchema,
  teachingExperienceDrAITSchema,
  teachingExperienceIndustrySchema,
  teachingExperienceResearchSchema,
  areaOfSpecializationSchema,
  eventsAttendedSchema,
  eventsOrganizedSchema,
  invitedTalksSchema,
  publicationsSchema,
  responsibilitiesSchema,
  extracurricularsSchema,
  outreachSchema,
  recognitionsSchema,
  awardsSchema,
});
