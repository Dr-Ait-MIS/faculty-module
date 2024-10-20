"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { facultyPersonalDetailsSchema } from "@/schemas/personal-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import FormProgress from "@/components/FormProgress";
import FormNavigation from "@/components/FormNavigation";
import FormField from "@/components/FormField";
import { Step } from "@/types/form";
import { FormProvider } from "@/hooks/FormProvider";
import FormFieldSelect from "@/components/FormFieldSelect";

type Inputs = z.infer<typeof facultyPersonalDetailsSchema>;

const steps: Step[] = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: [
      "personalSchema.qualification",
      "personalSchema.title",
      "personalSchema.prefix",
      "personalSchema.firstName",
      "personalSchema.lastName",
      "personalSchema.emailId",
      "personalSchema.contactNo",
      "personalSchema.alternateContactNo",
      "personalSchema.emergencyContactNo",
      "personalSchema.aadhar",
      "personalSchema.pan",
      "personalSchema.dob",
      "personalSchema.gender",
      "personalSchema.nationality",
    ],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: [
      "personalSchema.firstAddressLine2",
      "personalSchema.firstAddressLine1",
      "personalSchema.firstAddressLine3",
      "personalSchema.correspondenceAddressLine1",
      "personalSchema.correspondenceAddressLine2",
      "personalSchema.correspondenceAddressLine3",
    ],
  },
  {
    id: "Step 3",
    name: "Other Details",
    fields: [
      "personalSchema.religion",
      "personalSchema.caste",
      "personalSchema.category",
      "personalSchema.motherTongue",
      "personalSchema.speciallyChanged",
      "personalSchema.speciallyChangedRemarks",
      "personalSchema.languagesToSpeak",
      "personalSchema.languagesToRead",
      "personalSchema.languagesToWrite",
    ],
  },
  {
    id: "Step 4",
    name: "Account Details",
    fields: [
      "financialSchema.bankName",
      "financialSchema.accountNo",
      "financialSchema.accountName",
      "financialSchema.typeOfAccount",
      "financialSchema.branch",
      "financialSchema.ifscCode",
      "financialSchema.pfNumber",
      "financialSchema.uanNumber",
      "financialSchema.pensionNumber",
    ],
  },
  {
    id: "Step 5",
    name: "Education Details",
    fields: ["educationSchema"],
  },
  {
    id: "Step 6",
    name: "Dependents",
    fields: [
      "dependentsSchema.motherName",
      "dependentsSchema.fatherName",
      "dependentsSchema.spouseName",
      "dependentsSchema.children",
    ],
  },
  {
    id: "Step 7",
    name: "Complete",
    fields: [],
  },
];

const languagesOptions = [
  "English",
  "Hindi",
  "Kannada",
  "Malayalam",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(facultyPersonalDetailsSchema),
  });

  const [isSameAddress, setIsSameAddress] = useState(false);

  const firstAddressLine1 = watch("personalSchema.firstAddressLine1");
  const firstAddressLine2 = watch("personalSchema.firstAddressLine2");
  const firstAddressLine3 = watch("personalSchema.firstAddressLine3");

  const handleCheckboxChange = (e: any) => {
    setIsSameAddress(e.target.checked);

    if (!e.target.checked) {
      // Clear correspondence address fields when unchecked
      setValue("personalSchema.correspondenceAddressLine1", "");
      setValue("personalSchema.correspondenceAddressLine2", "");
      setValue("personalSchema.correspondenceAddressLine3", "");
    }
  };

  // Sync correspondence address fields if checkbox is checked
  useEffect(() => {
    if (isSameAddress) {
      setValue("personalSchema.correspondenceAddressLine1", firstAddressLine1);
      setValue("personalSchema.correspondenceAddressLine2", firstAddressLine2);
      setValue("personalSchema.correspondenceAddressLine3", firstAddressLine3);
    }
  }, [isSameAddress, firstAddressLine1, firstAddressLine2, firstAddressLine3]);

  // Initialize useFieldArray for children
  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: "dependentsSchema.children",
  });

  // Initialize useFieldArray for education details
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educationSchema",
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const nextButtonFunction = async () => {
    const fields = steps[currentStep].fields;

    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        const allFieldsValid = await trigger();
        console.log("Submitting entire form");
        if (allFieldsValid) {
          console.log("Validation Successfull with all input data");
          await handleSubmit(processForm)();
        } else {
          console.error(
            "Validation Error with all input data with entire schema"
          );
        }
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prevButtonFunction = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="flex flex-col justify-between p-24">
      <FormProgress steps={steps} currentStep={currentStep} />

      <FormProvider register={register} errors={errors}>
        <form onSubmit={handleSubmit(processForm)} className="mt-12 py-12">
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  label="Qualification"
                  stepsReference="personalSchema.qualification"
                  type="text"
                />

                <FormField
                  label="Title"
                  stepsReference="personalSchema.title"
                  type="text"
                />

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
                  <FormFieldSelect
                    className="col-span-1"
                    label="Prefix"
                    stepsReference="personalSchema.prefix"
                    options={["Mr", "Mrs", "Ms", "Dr"]}
                  />

                  <FormField
                    className="col-span-5"
                    label="First Name"
                    stepsReference="personalSchema.firstName"
                    type="text"
                  />
                </div>

                <FormField
                  label="Last Name"
                  stepsReference="personalSchema.lastName"
                  type="text"
                />

                <FormField
                  label="Email ID"
                  stepsReference="personalSchema.emailId"
                  type="email"
                />

                <FormField
                  label="Contact Number"
                  stepsReference="personalSchema.contactNo"
                  type="tel"
                />

                <FormField
                  label="Alternate Contact Number"
                  stepsReference="personalSchema.alternateContactNo"
                  type="tel"
                />

                <FormField
                  label="Emergency Contact Number"
                  stepsReference="personalSchema.emergencyContactNo"
                  type="tel"
                />

                <FormField
                  label="Aadhar Number"
                  stepsReference="personalSchema.aadhar"
                  type="text"
                />

                <FormField
                  label="PAN Number"
                  stepsReference="personalSchema.pan"
                  type="text"
                />

                <FormField
                  label="Date of Birth"
                  stepsReference="personalSchema.dob"
                  type="date"
                />

                <div></div>

                <FormFieldSelect
                  label="Gender"
                  stepsReference="personalSchema.gender"
                  options={["Male", "Female", "Other"]}
                />

                <FormField
                  label="Nationality"
                  stepsReference="personalSchema.nationality"
                  type="text"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Address
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  label="First Address Line 1"
                  stepsReference="personalSchema.firstAddressLine1"
                  type="text"
                />

                <FormField
                  label="First Address Line 2"
                  stepsReference="personalSchema.firstAddressLine2"
                  type="text"
                />

                <FormField
                  label="First Address Line 3"
                  stepsReference="personalSchema.firstAddressLine3"
                  type="text"
                />

                {/* Checkbox for Same Address */}
                <div className="sm:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSameAddress}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Same as First Address
                  </label>
                </div>

                <FormField
                  label="Correspondence Address Line 1"
                  stepsReference="personalSchema.correspondenceAddressLine1"
                  type="text"
                  disabled={isSameAddress}
                />

                <FormField
                  label="Correspondence Address Line 2"
                  stepsReference="personalSchema.correspondenceAddressLine2"
                  type="text"
                  disabled={isSameAddress}
                />

                <FormField
                  label="Correspondence Address Line 3"
                  stepsReference="personalSchema.correspondenceAddressLine3"
                  type="text"
                  disabled={isSameAddress}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Other Details
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormFieldSelect
                  label="Religion"
                  stepsReference="personalSchema.religion"
                  options={["Hindu", "Muslim", "Christian", "Sikh", "Other"]}
                />

                <FormFieldSelect
                  label="Caste"
                  stepsReference="personalSchema.caste"
                  options={[
                    "Brahmins",
                    "Thakur",
                    "Vaishya",
                    "Tyagi",
                    "Bhumihar",
                    "Muslims",
                    "Christians",
                    "Rajput",
                    "Kayastha",
                    "Pathans",
                    "Muslim Mughals",
                    "Muslim Shaikh",
                    "Muslim Sayyad",
                    "Jat Sikh",
                    "Bania",
                    "Punjabi Khatri",
                    "Punjabi Arora",
                    "Punjabi Sood",
                    "Baidya",
                    "Patidar",
                    "Patel",
                    "Kshatriya",
                    "Reddy",
                    "Kamma",
                    "Kapu",
                    "Gomati Baniya",
                    "Velamma",
                    "Kshatriya Raju",
                    "Iyengar",
                    "Iyer",
                    "Vellalars",
                    "Nair",
                    "Naidu",
                    "Mukkulathor",
                    "Sengunthar",
                    "Parkavakulam",
                    "Nagarathar Baniya",
                    "Komati",
                    "Vokkaligas",
                    "Lingayats",
                    "Bunts",
                  ]}
                />

                <FormFieldSelect
                  label="Category"
                  stepsReference="personalSchema.category"
                  options={["General", "OBC", "SC", "ST"]}
                />

                <FormFieldSelect
                  label="Mother Tongue"
                  stepsReference="personalSchema.motherTongue"
                  options={[
                    "Kannada",
                    "Malayalam",
                    "Hindi",
                    "English",
                    "Tamil",
                    "Telugu",
                    "Other",
                  ]}
                />

                {/* Specially Challenged Checkbox */}
                <div>
                  <label
                    htmlFor="speciallyChanged"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Specially Challenged
                  </label>
                  <input
                    type="checkbox"
                    id="speciallyChanged"
                    {...register("personalSchema.speciallyChanged")}
                    className="mt-1"
                  />
                  {errors.personalSchema?.speciallyChanged && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.personalSchema.speciallyChanged.message}
                    </p>
                  )}
                  <label
                    htmlFor="speciallyChangedRemarks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Specially Challenged Remarks
                  </label>
                  <input
                    type="text"
                    id="speciallyChangedRemarks"
                    {...register("personalSchema.speciallyChangedRemarks")}
                    className="mt-1 block w-full p-1 py-1.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                  />
                  {errors.personalSchema?.speciallyChangedRemarks && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.personalSchema.speciallyChangedRemarks.message}
                    </p>
                  )}
                </div>

                <div></div>

                {/* Languages to Speak (Multiselect Checkboxes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Languages to Speak
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {languagesOptions.map((language) => (
                      <div key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`languagesToSpeak_${language}`}
                          value={language}
                          {...register("personalSchema.languagesToSpeak")}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`languagesToSpeak_${language}`}
                          className="ml-2 block text-sm text-gray-900"
                        >
                          {language}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.personalSchema?.languagesToSpeak && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.personalSchema.languagesToSpeak.message}
                    </p>
                  )}
                </div>

                {/* Languages to Read (Multiselect Checkboxes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Languages to Read
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {languagesOptions.map((language) => (
                      <div key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`languagesToRead_${language}`}
                          value={language}
                          {...register("personalSchema.languagesToRead")}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`languagesToRead_${language}`}
                          className="ml-2 block text-sm text-gray-900"
                        >
                          {language}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.personalSchema?.languagesToRead && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.personalSchema.languagesToRead.message}
                    </p>
                  )}
                </div>

                {/* Languages to Write (Multiselect Checkboxes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Languages to Write
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {languagesOptions.map((language) => (
                      <div key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`languagesToWrite_${language}`}
                          value={language}
                          {...register("personalSchema.languagesToWrite")}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`languagesToWrite_${language}`}
                          className="ml-2 block text-sm text-gray-900"
                        >
                          {language}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.personalSchema?.languagesToWrite && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.personalSchema.languagesToWrite.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Financial Details
              </h2>

              {/* Financial Details Form Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  label="Bank Name"
                  stepsReference="financialSchema.bankName"
                  type="text"
                />

                <FormField
                  label="Account Number"
                  stepsReference="financialSchema.accountNo"
                  type="text"
                />

                <FormField
                  label="Account Name"
                  stepsReference="financialSchema.accountName"
                  type="text"
                />

                <div>
                  <label
                    htmlFor="typeOfAccount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type of Account
                  </label>
                  <select
                    id="typeOfAccount"
                    {...register("financialSchema.typeOfAccount")}
                    className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                  >
                    <option>Savings</option>
                    <option>Current</option>
                  </select>
                  {errors.financialSchema?.typeOfAccount && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.financialSchema.typeOfAccount.message}
                    </p>
                  )}
                </div>

                <FormField
                  label="Branch"
                  stepsReference="financialSchema.branch"
                  type="text"
                />

                <FormField
                  label="IFSC Code"
                  stepsReference="financialSchema.ifscCode"
                  type="text"
                />

                <FormField
                  label="PF Number"
                  stepsReference="financialSchema.pfNumber"
                  type="text"
                />

                <FormField
                  label="UAN Number"
                  stepsReference="financialSchema.uanNumber"
                  type="text"
                />

                <FormField
                  label="Pension Number"
                  stepsReference="financialSchema.pensionNumber"
                  type="text"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Education Details
              </h2>

              {/* Education Details Form Fields */}
              {educationFields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  <FormField
                    label="Program (Class)"
                    stepsReference={`educationSchema.${index}.class`}
                    type="text"
                  />

                  <FormField
                    label="USN"
                    stepsReference={`educationSchema.${index}.usn`}
                    type="text"
                  />

                  <FormField
                    label="Institution"
                    stepsReference={`educationSchema.${index}.institution`}
                    type="text"
                  />

                  <FormField
                    label="Specialization"
                    stepsReference={`educationSchema.${index}.specialization`}
                    type="text"
                  />

                  <FormField
                    label="Medium of Instruction"
                    stepsReference={`educationSchema.${index}.mediumOfInstruction`}
                    type="text"
                  />

                  {/* Direct Correspondence Dropdown */}
                  <div>
                    <label
                      htmlFor="directCorr"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Direct/Correspondence
                    </label>
                    <select
                      id="directCorr"
                      {...register(`educationSchema.${index}.directCorr`)}
                      className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                    >
                      <option value="Direct">Direct</option>
                      <option value="Correspondence">Correspondence</option>
                    </select>
                    {errors.educationSchema?.[index]?.directCorr && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.educationSchema[index].directCorr.message}
                      </p>
                    )}
                  </div>

                  {/* Pass Class Dropdown */}
                  <div>
                    <label
                      htmlFor="passClass"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Pass Class
                    </label>
                    <select
                      id="passClass"
                      {...register(`educationSchema.${index}.passClass`)}
                      className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                    >
                      <option value="Distinction">Distinction</option>
                      <option value="First">First</option>
                      <option value="Second">Second</option>
                      <option value="Third">Third</option>
                      <option value="Fail">Fail</option>
                    </select>
                    {errors.educationSchema?.[index]?.passClass && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.educationSchema[index].passClass.message}
                      </p>
                    )}
                  </div>

                  {/* Remove Education Button */}
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-600 text-sm"
                    >
                      Remove Education
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Education Button */}
              <button
                type="button"
                onClick={() =>
                  appendEducation({
                    class: "",
                    usn: "",
                    institution: "",
                    specialization: "",
                    mediumOfInstruction: "",
                    directCorr: "Direct",
                    passClass: "First",
                  })
                }
                className="text-indigo-600 text-sm"
              >
                + Add Education
              </button>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Dependents
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  label="Mother Name"
                  stepsReference="dependentsSchema.motherName"
                  type="text"
                />

                <FormField
                  label="Father Name"
                  stepsReference="dependentsSchema.fatherName"
                  type="text"
                />

                <FormField
                  label="Spouse Name"
                  stepsReference="dependentsSchema.spouseName"
                  type="text"
                />

                {/* Children */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 py-2">
                    Children
                  </label>

                  {childFields.map((child, index) => (
                    <div
                      key={child.id}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"
                    >
                      <FormField
                        label="Name"
                        stepsReference={`dependentsSchema.children[${index}].name`}
                        type="text"
                      />

                      <FormFieldSelect
                        label="Gender"
                        stepsReference={`dependentsSchema.children[${index}].gender`}
                        options={["Male", "Gender", "Prefer Not to Say"]}
                      />

                      <FormField
                        label="Date of Birth"
                        stepsReference={`dependentsSchema.children[${index}].dob`}
                        type="date"
                      />

                      {/* Remove Child Button */}
                      <div className="col-span-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeChild(index)}
                          className="text-red-600 text-sm"
                        >
                          Remove Child
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Child Button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() =>
                        appendChild({
                          name: "",
                          gender: "Male",
                          dob: "",
                        })
                      }
                      className="text-indigo-600 text-sm"
                    >
                      + Add Child
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 6 && <div>Complete</div>}
        </form>
      </FormProvider>

      <FormNavigation
        prevButtonFunction={prevButtonFunction}
        steps={steps}
        currentStep={currentStep}
        nextButtonFunction={nextButtonFunction}
      />
    </section>
  );
}
