import React from 'react'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
}

function isTableRow(line: string) {
  return line.includes('|') && line.split('|').filter(c => c.trim()).length >= 2
}

/**
 * Renders question stem text, automatically converting pipe-delimited lines
 * into a styled HTML table. Non-pipe lines render as paragraphs.
 *
 * Table format in DB:
 *   Header Col 1 | Header Col 2 | Header Col 3
 *   Row 1 Col 1  | Row 1 Col 2  | Row 1 Col 3
 */
export default function QuestionStemRenderer({ text, className = '', style }: Props) {
  const lines = text.split('\n')

  type Block =
    | { type: 'text'; content: string }
    | { type: 'table'; rows: string[][] }

  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) { i++; continue }

    if (isTableRow(line)) {
      const rows: string[][] = []
      while (i < lines.length && isTableRow(lines[i].trim())) {
        rows.push(lines[i].trim().split('|').map(c => c.trim()))
        i++
      }
      blocks.push({ type: 'table', rows })
    } else {
      blocks.push({ type: 'text', content: line })
      i++
    }
  }

  return (
    <div className={className} style={style}>
      {blocks.map((block, idx) => {
        if (block.type === 'text') {
          return (
            <p key={idx} className={`leading-relaxed text-[#1a1a1a]${idx > 0 ? ' mt-2' : ''}`}>
              {block.content}
            </p>
          )
        }

        const [header, ...dataRows] = block.rows
        return (
          <div key={idx} className="my-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {header.map((cell, ci) => (
                    <th
                      key={ci}
                      className="border border-[#c8c0c4] bg-[#f4f0f1] px-3 py-2 text-left font-semibold text-[#1a1a1a] whitespace-nowrap"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-[#fdfcfb]'}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="border border-[#c8c0c4] px-3 py-2 text-[#1a1a1a]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}
