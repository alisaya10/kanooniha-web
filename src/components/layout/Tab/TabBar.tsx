import React, { useState } from 'react'

const TabBar = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabTitles = React.Children.map(children, (child) => child.props.tabTitle)
  const tabContents = React.Children.toArray(children)

  return (
    <div className="w-full">
      <div className="flex border-b border-b-textGray300">
        {tabTitles.map((title, index) => (
          <button
            key={index}
            className={`w-full cursor-pointer text-[17px] font-medium pb-[17px] pt-6 ${
              activeTab === index
                ? 'border-b-[3px] border-b-seeAllBlue text-seeAllBlue'
                : 'border-b-[3px] border-b-transparent  text-textGray600'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {title}
          </button>
        ))}
      </div>

      <div>{tabContents[activeTab]}</div>
    </div>
  )
}

// Tab Component (Child component)
const Tab = ({ tabTitle, children }) => {
  return <div>{children}</div>
}

export { TabBar, Tab } // Export both TabBar and Tab components
