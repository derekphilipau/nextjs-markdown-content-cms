// For more help visit https://formspr.ee/react-help
// In this CMS system, a form MUST have a default export and be located in the src/components/forms directory.

import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("movawrdv");
  if (state.succeeded) {
    return (
      <p className="text-green-600 font-semibold">Thanks for contacting me!</p>
    );
  }
  return (
    <div className="py-6 max-w-3xl mx-auto">
      <h2 className="text-3xl mb-8">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block font-medium text-neutral-700 dark:text-neutral-300"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-600 dark:text-red-400 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block font-medium text-neutral-700 dark:text-neutral-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-600 dark:text-red-400 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={state.submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
