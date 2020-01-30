import React from "react"
import MyLink from "./mylink"

const letters = "abcdefghijklmnopqrstuvwxyz".split("")

const TartansNavigation = ({
  className,
  letter,
  index,
  last,
  previousLetterLastIndex,
}) => {
  const first = index === 0

  const letterIndex = letters.indexOf(letter)
  const previousLetter = letterIndex > 0 ? letters[letterIndex - 1] : ""
  const nextLetter =
    letterIndex < letters.length - 1 ? letters[letterIndex + 1] : ""

  const previousUrl =
    index === 0
      ? previousLetterLastIndex === 1
        ? `/tartans/${previousLetter}`
        : `/tartans/${previousLetter}/${previousLetterLastIndex}`
      : index === 1
      ? `/tartans/${letter}`
      : `/tartans/${letter}/${index}`

  const nextUrl = last
    ? `/tartans/${nextLetter}`
    : `/tartans/${letter}/${(index + 2).toString()}`

  return (
    <nav className={`nav ${className}`}>
      <div className="previousLink">
        {(!first || previousLetter) && (
          <MyLink to={previousUrl} aria-label="Go to Previous Page">
            <span className="icon">&lsaquo;</span>
          </MyLink>
        )}
      </div>
      <div className="nextLink">
        {(!last || nextLetter) && (
          <MyLink to={nextUrl} aria-label="Go to Next Page ">
            <span className="icon">&rsaquo;</span>
          </MyLink>
        )}
      </div>
    </nav>
  )
}

export default TartansNavigation
