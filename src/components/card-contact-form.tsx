"use client";

import { FormEvent, useState } from "react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const CardContactForm = () => {
    const [status, setStatus] = useState<Status>("idle");

    if (!WEB3FORMS_KEY) {
        return null;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);

        const name = String(data.get("name") ?? "").trim();
        const contact = String(data.get("contact") ?? "").trim();
        const whereWeMet = String(data.get("whereWeMet") ?? "").trim();

        const payload: Record<string, unknown> = {
            access_key: WEB3FORMS_KEY,
            subject: `New contact from card: ${name}`,
            from_name: name,
            page: "/card",
            contact,
            where_we_met: whereWeMet || "(not provided)",
            botcheck: data.get("botcheck") === "on",
        };
        if (contact.includes("@")) {
            payload.email = contact;
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
        "w-full bg-transparent border border-gray-400 dark:border-gray-600 rounded-none px-2.5 py-1.5 text-sm focus:outline-none focus:border-purple-500 dark:focus:border-purple-500";

    if (status === "sent") {
        return (
            <p className="text-sm text-purple-700 dark:text-purple-400 py-2">
                Got it — nice meeting you!
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2">
            <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />
            <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                    Name
                </span>
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass}
                />
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                    Email, phone, or handle
                </span>
                <input
                    type="text"
                    name="contact"
                    required
                    maxLength={200}
                    placeholder="you@example.com / +358... / @handle"
                    className={inputClass}
                />
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                    Where we met / note (optional)
                </span>
                <textarea
                    name="whereWeMet"
                    maxLength={1000}
                    rows={3}
                    placeholder="Met at..., let's grab coffee..."
                    className={inputClass}
                />
            </label>
            <div className="flex flex-row items-center gap-3 pt-1">
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="!text-black dark:!text-white bg-purple-500 dark:bg-purple-800 hover:bg-purple-400 dark:hover:bg-purple-900 rounded-none py-2 px-4 text-sm font-bold transition-colors duration-200 ease-in-out"
                >
                    {status === "sending" ? "Sending..." : "Send"}
                </button>
                {status === "error" && (
                    <span className="text-xs text-red-600 dark:text-red-400">
                        Something went wrong, please try again.
                    </span>
                )}
            </div>
        </form>
    );
};

export default CardContactForm;
