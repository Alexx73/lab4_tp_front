import React from 'react'

function Footer() {
  return (
        <footer classNames="bg-white rounded-lg shadow dark:bg-gray-900 m-4 mt-4">
            <div classNames="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div classNames="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" classNames="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" classNames="h-8" alt="Flowbite Logo" />
                        <span classNames="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <ul classNames="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" classNames="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" classNames="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" classNames="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" classNames="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr classNames="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span classNames="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" classNames="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
            </div>
        </footer>


  )
}

export default Footer
