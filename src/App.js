import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor'
import matter from 'gray-matter'
import moment from 'moment'
import './App.css';

function App() {
  const toastRef = useRef()

  const initialTemplate = `---
title:
date: ${moment().format('YYYY-MM-DD HH:MM:SS')}
tags:
category: 
---`

  const handleSave = () => {
    const markdown = toastRef.current.getInstance().getMarkdown()
    const { data } = matter(markdown)
    const a = document.createElement('a')
    const file = new Blob([markdown], { type: 'text/plain' })
    a.href = window.URL.createObjectURL(file)
    a.download = `${data.title}.md`
    document.body.appendChild(a)
    a.click()
  }

  return (
    <div className='editor-wrapper'>
      <Editor
        previewStyle="vertical"
        height="100vh"
        initialEditType="markdown"
        initialValue={initialTemplate}
        ref={toastRef}
      />
      <button className='save-btn' onClick={handleSave}>Save</button>
    </div>
  );
}

export default App;