import React, { useEffect, useMemo, useState } from 'react'

const TabBar = ({
  children,
  setTabState,
  activeTabIndex: controlledActiveTabIndex,
  onActiveTabChange,
}: {
  children: any
  setTabState: any
  activeTabIndex?: number
  onActiveTabChange?: (index: number) => void
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(0)
  const activeTab = controlledActiveTabIndex ?? internalActiveTab

  const tabTitles = useMemo(
    () => React.Children.map(children, (child) => child.props.tabTitle) ?? [],
    [children],
  )
  const tabContents = React.Children.toArray(children)

  const handleTabChange = (index: number) => {
    if (onActiveTabChange) {
      onActiveTabChange(index)
    } else {
      setInternalActiveTab(index)
    }
  }

  useEffect(() => {
    setTabState?.(tabTitles[activeTab])
  }, [activeTab, setTabState, tabTitles])

  return (
    <div className="w-full">
      <div className="flex border-b border-b-textGray300">
        {tabTitles.map((title: string, index: number) => (
          <button
            key={index}
            className={`w-full cursor-pointer text-[17px] font-medium pb-[17px] pt-6 ${
              activeTab === index
                ? 'border-b-[3px] border-b-seeAllBlue text-seeAllBlue'
                : 'border-b-[3px] border-b-transparent  text-textGray600'
            }`}
            onClick={() => handleTabChange(index)}
          >
            <p className="lg:text-base text-sm">{title}</p>
          </button>
        ))}
      </div>

      <div>{tabContents[activeTab]}</div>
    </div>
  )
}

// Tab Component (Child component)
const Tab = ({ children }: { tabTitle: string; children: React.ReactNode }) => {
  return <div>{children}</div>
}

export { TabBar, Tab } // Export both TabBar and Tab components
