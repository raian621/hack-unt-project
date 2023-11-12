import React, { useEffect, useState } from 'react'

import Section from './Section';

async function getSectionsData() {
  let res = await fetch("http://localhost:3000/tree")
  let sectionsData = await res.json()
  
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

  // const sections = [
  //   {
  //     name: "Introduction",
  //     lessons: [
  //       'Risk Management',
  //       'Money Management'
  //     ]
  //   },
  //   {
  //     name: "Investing",
  //     lessons: [
  //       'Stocks',
  //       'ETFs',
  //       'Crypto'
  //     ]
  //   },
  //   {
  //     name: "Cryptocurrency",
  //     lessons: [
  //       "What is crypto",
  //       "NFTs"
  //     ]
  //   }
  // ]
 
  return (
    <>
      { sections.map(section => {
        console.log("section:", section)
        return <Section name={section.name} lessons={section.lessons}/>
      })}
    </>
  )
}