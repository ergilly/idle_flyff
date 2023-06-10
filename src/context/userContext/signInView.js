import React, { useState } from 'react'

export function SignInView({ setSignUp, onClick, error }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white bg-opacity-90 px-6 py-6 shadow sm:rounded-lg sm:px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <input checked={checked} onChange={handleChange} id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/> */}
            <span
              htmlFor="remember-me"
              className="ml-3 block text-sm leading-6 text-gray-900"
            >
              Remember me
            </span>
          </div>

          <div className="text-sm leading-6">
            {/* <a onClick={handleReset} href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              onClick(email, password)
            }}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
          <span>{error}</span>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          New to Flyff Idle?
          <button
            onClick={() => {
              setSignUp(true)
            }}
            type="button"
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {' '}
            Create a new account here!
          </button>
        </p>
      </div>
    </div>
  )
}
