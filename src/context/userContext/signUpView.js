import React, { useState } from 'react'

export function SignUpView({ setSignUp, onClick, error }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white bg-opacity-90 px-6 py-6 shadow sm:rounded-lg sm:px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for Flyff Idle
          </h2>
        </div>
        <div>
          <span
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Display name
          </span>
          <div className="mt-2">
            <input
              onChange={(event) => {
                setUsername(event.target.value)
              }}
              required
              type="text"
              name="username"
              id="username"
              placeholder="username"
              autoComplete="username"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <span
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </span>
          <div className="mt-2">
            <input
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <span
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </span>
          <div className="mt-2">
            <input
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              onClick(username, email, password)
            }}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Account
          </button>
          <span>{error}</span>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <button
            onClick={() => {
              setSignUp(false)
            }}
            type="button"
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {' '}
            Sign in here!
          </button>
        </p>
      </div>
    </div>
  )
}
