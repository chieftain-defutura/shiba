import axios from 'axios'
import React, { useState, useEffect, useMemo, useRef } from 'react'

const subString = [
  'template-blue',
  'template-green',
  'template-violet',
  'template-crimson',
  'template-darkslateblue',
]

interface ITemplate {
  path: string
}

const Template: React.FC<ITemplate> = ({ path }) => {
  const [htmlFileString, setHtmlFileString] = useState('')
  const [color, setColor] = useState('blue')
  const htmlRef = useRef<HTMLDivElement>(null)

  const fetchHtml = async () => {
    const examplePage = path
    const { data } = await axios.get(examplePage, { responseType: 'text' })
    setHtmlFileString(data)
  }

  const download = (filename: string, text: any) => {
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/html;charset=utf-8,' + encodeURIComponent(text),
    )
    element.setAttribute('download', filename)

    // element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  useMemo(() => {
    if (!color) return
    subString.forEach((f) => {
      if (color === 'blue') {
        if (htmlFileString.toLowerCase().includes(f)) {
          return setHtmlFileString(htmlFileString.replace(f, 'template-blue'))
        }
        return console.log('htmlFileString')
      }

      if (color === 'green') {
        if (htmlFileString.toLowerCase().includes(f)) {
          return setHtmlFileString(htmlFileString.replace(f, 'template-green'))
        }
        return console.log('htmlFileString')
      }
      if (color === 'violet') {
        if (htmlFileString.toLowerCase().includes(f) === true) {
          return setHtmlFileString(htmlFileString.replace(f, 'template-violet'))
        }
        return console.log('htmlFileString')
      }
      if (color === 'darkslateblue') {
        if (htmlFileString.toLowerCase().includes(f) === true) {
          return setHtmlFileString(
            htmlFileString.replace(f, 'template-darkslateblue'),
          )
        }
        return console.log('htmlFileString')
      }

      if (color === 'crimson') {
        if (htmlFileString.toLowerCase().includes(f) === true) {
          return setHtmlFileString(
            htmlFileString.replace(f, 'template-crimson'),
          )
        }
        return console.log('htmlFileString')
      }
    })

    console.log('template')
  }, [color, htmlFileString])

  useEffect(() => {
    fetchHtml()
  }, [])

  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className="header">
            <form className="theme-checker">
              <input
                type="radio"
                name="theme"
                id="blue"
                checked={color === 'blue'}
                onChange={() => setColor('blue')}
              />
              <input
                type="radio"
                name="theme"
                id="green"
                checked={color === 'green'}
                onChange={() => setColor('green')}
              />
              <input
                type="radio"
                name="theme"
                id="violet"
                checked={color === 'violet'}
                onChange={() => setColor('violet')}
              />
              <input
                type="radio"
                name="theme"
                id="darkslateblue"
                checked={color === 'darkslateblue'}
                onChange={() => setColor('darkslateblue')}
              />
              <input
                type="radio"
                name="theme"
                id="crimson"
                checked={color === 'crimson'}
                onChange={() => setColor('crimson')}
              />
            </form>
          </div>
        </div>

        <div
          ref={htmlRef}
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: htmlFileString }}
        />

        <button onClick={() => download('Template-One.html', htmlFileString)}>
          download
        </button>
      </div>
    </>
  )
}

export default Template
