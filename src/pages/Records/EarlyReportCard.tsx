import { useLocation } from 'react-router-dom'
import parse, { domToReact } from 'html-react-parser'

import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { PATHS } from '@/routes/paths'

const EarlyReportCard = () => {
  const location = useLocation()
  let htmlContent = location?.state?.htmlContent

  const HtmlTableViewer = ({ htmlContent }: { htmlContent: string }) => {
    if (!htmlContent || typeof htmlContent !== 'string') {
      return <p>No valid HTML content provided.</p>
    }

    const options = {
      replace: (domNode: any) => {
        if (domNode.name === 'table') {
          return (
            <table className="w-full border-collapse border border-gray-100 bg-white rounded-lg overflow-hidden">
              {domToReact(domNode.children, options)}
            </table>
          )
        }
        if (domNode.name === 'th') {
          return (
            <th className="border font-iransans border-gray-100 bg-seeAllBlue last-of-type:rounded-tl-lg first-of-type:rounded-tr-lg text-white text-sm font-bold  p-3 text-center">
              {domToReact(domNode.children, options)}
            </th>
          )
        }
        if (domNode.name === 'td') {
          return (
            <td className="border font-iransans text-xs border-gray-100 p-3 text-center">
              {domToReact(domNode.children, options)}
            </td>
          )
        }
        if (domNode.name === 'tr') {
          return (
            <tr className="hover:bg-gray-100 font-iransans">
              {domToReact(domNode.children, options)}
            </tr>
          )
        }
        if (domNode.name === 'caption') {
          return (
            <caption className="font-iransans font-bold text-lg text-center pb-5">
              {domToReact(domNode.children, options)}
            </caption>
          )
        }
      },
    }

    return <div className="table-container">{parse(htmlContent, options)}</div>
  }

  return (
    <PageLayout title="کارنامه زودهنگام" backLink={PATHS.Dashboard} hasData={true}>
      <HtmlTableViewer htmlContent={htmlContent} />
    </PageLayout>
  )
}

export default EarlyReportCard
