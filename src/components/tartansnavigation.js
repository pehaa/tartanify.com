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
  const letterIndex = letters.indexOf(letter)
  const previousLetter = letterIndex > 0 ? letters[letterIndex - 1] : null
  const nextLetter =
    letterIndex < letters.length - 1 ? letters[letterIndex + 1] : null

  let previousUrl = null,
    nextUrl = null

  if (index === 0 && previousLetter) {
    const linkFragment =
      previousLetterLastIndex === 1 ? "" : `/${previousLetterLastIndex}`
    previousUrl = `/tartans/${previousLetter}${linkFragment}`
  } else if (index === 1) {
    previousUrl = `/tartans/${letter}`
  } else if (index > 1) {
    previousUrl = `/tartans/${letter}/${index}`
  }

  if (last && nextLetter) {
    nextUrl = `/tartans/${nextLetter}`
  } else if (!last) {
    nextUrl = `/tartans/${letter}/${(index + 2).toString()}`
  }

  return (
    <nav className={`nav ${className}`}>
      <div className="previousLink">
        {previousUrl && (
          <MyLink to={previousUrl} aria-label="Go to Previous Page">
            <span className="icon">&lsaquo;</span>
          </MyLink>
        )}
      </div>
      <div className="nextLink">
        {nextUrl && (
          <MyLink to={nextUrl} aria-label="Go to Next Page ">
            <span className="icon">&rsaquo;</span>
          </MyLink>
        )}
      </div>
    </nav>
  )

  return (
    <nav className={`nav ${className}`}>
      {previousUrl && (
        <Link to={previousUrl} aria-label="Go to Previous Page">
          &lsaquo;
        </Link>
      )}
      {nextUrl && (
        <Link to={nextUrl} aria-label="Go to Next Page">
          &rsaquo;
        </Link>
      )}
    </nav>
  )
}

export default TartansNavigation
