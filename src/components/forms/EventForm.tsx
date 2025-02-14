"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { eventSchema, EventSchema } from "@/lib/formValidationSchemas";
import { createEvent, updateEvent } from "@/lib/actions";

const EventForm = ({
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
    } = useForm<EventSchema>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: data?.title || "",
            startTime: data?.startTime || "",
            endTime: data?.endTime || "",
            description: data?.description || "",
            classId: data?.classId || "",
        },
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();
const { userId } = auth(); // ✅ ดึง userId

    const onSubmit = async (formData: EventSchema) => {
        setLoading(true);
        try {
            if (type === "create") {
                await createEvent(userId, formData); // ✅ ส่ง userId เข้าไปด้วย
                toast.success("Event created successfully!");
            } else {
                await updateEvent(data.id, formData);
                toast.success("Event updated successfully!");
            }

            setOpen(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const { classes } = relatedData;

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new event" : "Update the event"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Event title"
                    name="title"
                    register={register}
                    error={errors?.title}
                />
                <InputField
                    label="Start Date"
                    name="startTime"
                    register={register}
                    error={errors?.startTime}
                    type="datetime-local"
                />
                <InputField
                    label="End Date"
                    name="endTime"
                    register={register}
                    error={errors?.endTime}
                    type="datetime-local"
                />
                <InputField
                    label="Description"
                    name="description"
                    register={register}
                    error={errors?.description}
                    multiline
                    textareaProps={{
                        placeholder: "Enter your description here...",
                        rows: 4,
                    }}
                />
                {data && (
                    <InputField
                        label="Id"
                        name="id"
                        register={register}
                        error={errors?.id}
                        hidden
                    />
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Class</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full max-h-20 overflow-y-auto"
                        {...register("classId")}
                    >
                        <option value="">Select a Class</option>
                        {classes.map((classItem: { id: number; name: string }) => (
                            <option value={classItem.id} key={classItem.id}>
                                {classItem.name}
                            </option>
                        ))}
                    </select>
                    {errors.classId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.classId.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-400 text-white p-2 rounded-md"
                disabled={loading}
            >
                {loading ? "Saving..." : type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default EventForm;
