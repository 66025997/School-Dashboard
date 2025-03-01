"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas";
import { createResult, updateResult } from "@/lib/actions";
import { number } from "zod";

const ResultForm = ({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResultSchema>({
        resolver: zodResolver(resultSchema),
    });

    // AFTER REACT 19 IT'LL BE USEACTIONSTATE

    const [state, formAction] = useActionState(
        type === "create" ? createResult : updateResult,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((data) => {
        const processedData = {
            ...data,
            score: Number(data.score), // Convert score to a number
        };

        formAction(processedData); // Call your action with the processed data

        //formAction(data);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { students } = relatedData;

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new result" : "Update the result"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Score"
                    name="score"
                    defaultValue={data?.score}
                    register={register}
                    error={errors?.score}
                />
                {data && (
                    <InputField
                        label="Id"
                        name="id"
                        defaultValue={data?.id}
                        register={register}
                        error={errors?.id}
                        hidden
                    />
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Student</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full max-h-20 overflow-y-auto"
                        {...register("studentId")}
                        defaultValue={
                            type === "create" ? data?.students || "" : data?.students
                        }
                    >
                        <option value="" disabled>
                            Select a Student
                        </option>
                        {students.map(
                            (student: { id: number; name: string; surname: string }) => (
                                <option value={student.id} key={student.id}>
                                    {student.name} {student.surname}
                                </option>
                            )
                        )}
                    </select>
                    {errors.studentId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.studentId.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            {state.error && (
                <span className="text-red-500">Something went wrong!</span>
            )}
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ResultForm;