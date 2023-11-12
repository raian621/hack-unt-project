import React, { useEffect, useState } from 'react'

import Section from './Section';

async function getSectionsData() {
  let res = await fetch("http://localhost:3000/tree")
  let sectionsData = await res.json()
  console.log(sectionsData)
  return sectionsData
}

export default function Dashboard() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    getSectionsData().then(
      sectionData =>{ setSections(sectionData) },
      err => console.error(err)
    )
  }, [])

  useEffect(() => {
    console.log(sections)
  }, [sections])
 
  return (
    <>
      <h1>SaveSmart Finance</h1>
      { sections.map(section => {
        return <Section name={section.name} lessons={section.lessons}/>
      })}
    </>
  )
}