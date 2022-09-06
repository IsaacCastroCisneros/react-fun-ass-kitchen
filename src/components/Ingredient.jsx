import React from 'react'

export default function Ingredient() 
{
    return (
      <div className="flex flex-col border-[1px] border-gray-400 p-[1rem] rounded-[.5rem]">
        <span>
          <strong>Name:</strong>
        </span>
        <span>
          <strong>Amount:</strong>
        </span>
      </div>
    );
}
