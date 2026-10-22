'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

import { CustomerField } from '@/app/lib/definitions';
import { createInvoice, State } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function Form({
  customers,
}: {
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer */}
        <div className="mb-4">
          <label
            htmlFor="customer"
            className="mb-2 block text-sm font-medium"
          >
            Choose customer
          </label>

          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue=""
              aria-describedby="customer-error"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            >
              <option value="" disabled>
                Select a customer
              </option>

              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>

            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium"
          >
            Choose an amount
          </label>

          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              aria-describedby="amount-error"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            />

            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>

          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  aria-describedby="status-error"
                  className="h-4 w-4 cursor-pointer border-gray-300"
                />

                <label htmlFor="pending" className="ml-2 cursor-pointer">
                  Pending <ClockIcon className="inline h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  aria-describedby="status-error"
                  className="h-4 w-4 cursor-pointer border-gray-300"
                />

                <label htmlFor="paid" className="ml-2 cursor-pointer">
                  Paid <CheckIcon className="inline h-4 w-4" />
                </label>
              </div>
            </div>
          </div>

          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </fieldset>

        {/* General message */}
        <div aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-4 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>

        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}