"use client";

import { FormEvent, useState } from "react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const FeedbackForm = ({ slug, title }: { slug: string; title: string }) => {
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
            subject: `Blog feedback: ${title}`,
            from_name: email ? email : "Anonymous reader",
            post: slug,
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

    if (status === "sent") {
        return (
            <section className="mt-8 border-t border-neutral-400 dark:border-neutral-700 pt-6">
                <p className="text-lg">Thanks, your feedback was sent!</p>
            </section>
        );
    }

    const inputClass =
        "w-full bg-transparent border border-neutral-400 dark:border-neutral-700 px-2 py-1 focus:outline-none focus:border-purple-500 dark:focus:border-orange-500";

    return (
        <section className="mt-8 border-t border-neutral-400 dark:border-neutral-700 pt-6">
            <h3 className="text-xl mb-1">Feedback</h3>
            <p className="text-sm mb-4 text-neutral-500">
                Anonymous by default. Leave an email only if you want a reply.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                        className="px-3 py-1 dark:bg-orange-500 bg-purple-500 dark:text-black text-white dark:hover:bg-orange-600 hover:bg-purple-400 transition-colors duration-200 ease-in-out disabled:opacity-50"
                    >
                        {status === "sending" ? "Sending..." : "Send"}
                    </button>
                    {status === "error" && (
                        <span className="text-sm text-red-500">
                            Something went wrong, please try again.
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
};

export default FeedbackForm;
