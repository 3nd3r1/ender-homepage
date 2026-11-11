"use client";

import { FormEvent, useState } from "react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const FeedbackForm = ({
    subject,
    page,
    intro,
    textClassName,
}: {
    subject: string;
    page: string;
    intro: string;
    textClassName?: string;
}) => {
    const [status, setStatus] = useState<Status>("idle");

    if (!WEB3FORMS_KEY) {
        return null;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);

        const email = String(data.get("email") ?? "").trim();
        const payload: Record<string, unknown> = {
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: email ? email : "Anonymous",
            page,
            message: String(data.get("message") ?? "").trim(),
            botcheck: data.get("botcheck") === "on",
        };
        if (email) {
            payload.email = email;
        }

        setStatus("sending");
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = (await response.json()) as { success?: boolean };
            if (!result.success) {
                throw new Error("Submission failed");
            }
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    };

    const inputClass =
        "w-full bg-transparent border border-gray-600 rounded-none px-2 py-1";

    if (status === "sent") {
        return <p className={textClassName}>Thanks, your feedback was sent!</p>;
    }

    return (
        <>
            <p className={textClassName}>{intro}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-3">
                <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                />
                <label className="flex flex-col gap-1">
                    <span className="text-sm">Message</span>
                    <textarea
                        name="message"
                        required
                        maxLength={5000}
                        rows={5}
                        className={inputClass}
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-sm">Email (optional)</span>
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        className={inputClass}
                    />
                </label>
                <div className="flex flex-row items-center gap-4">
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="!text-black dark:!text-white bg-purple-500 dark:bg-purple-800 hover:bg-purple-400 dark:hover:bg-purple-900 rounded-none py-2 px-4 text-lg font-bold transition-colors duration-200 ease-in-out"
                    >
                        {status === "sending" ? "Sending..." : "Send"}
                    </button>
                    {status === "error" && (
                        <span className="text-xs">
                            Something went wrong, please try again.
                        </span>
                    )}
                </div>
            </form>
        </>
    );
};

export default FeedbackForm;
