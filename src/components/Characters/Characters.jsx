import React from "react"
import CharacterCard from "./CharacterCard/CharacterCard"
import { useState, useEffect } from "react"
import { CircularProgress } from "@material-ui/core"
import "./Characters.css"
import Pagination from "@material-ui/lab/Pagination"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import CharacterDetail from "./CharacterDetail/CharacterDetail"

export default function Characters() {
  const [statusValue, setStatusValue] = React.useState("")
  const [isPopup, setIsPopup] = React.useState(false)
  const [selected, setSelectedID] = React.useState(false)
  const [genderValue, setGenderValue] = React.useState("")
  const [data, setData] = useState([])
  const [isLoaded, setisLoaded] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setcurrentPage] = useState(0)

  const baseURL = `https://rickandmortyapi.com/api/character/?page=${currentPage}`

  useEffect(() => {
    handleFetch()
  }, [statusValue, genderValue, currentPage])

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value)
  }
  const handleGenderChange = (event) => {
    setGenderValue(event.target.value)
  }

  const handleFetch = () => {
    fetch(baseURL + "&status=" + statusValue + "&gender=" + genderValue)
      .then((response) => response.json())
      .then((body) => {
        setData([...body.results])
        setPageCount(body.info.pages)
        setisLoaded(true)
      })
      .catch((error) => console.error("Error", error))
  }

  const handlePageChange = (object, page) => {
    setData([])
    setisLoaded(false)
    setcurrentPage(page)
  }

  return (
    <div>
      {isPopup ? (
        <CharacterDetail
          element={selected}
          toggle={() => {
            setIsPopup(false)
          }}
        />
      ) : null}
      <div className="btns">
        <div className="sort_btns">
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={statusValue}
              onChange={handleStatusChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"alive"}>alive</MenuItem>
              <MenuItem value={"dead"}>dead</MenuItem>
              <MenuItem value={"unknown"}>unknown</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="sort_btns">
          <FormControl>
            <InputLabel>Gender</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={genderValue}
              onChange={handleGenderChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"female"}>female</MenuItem>
              <MenuItem value={"male"}>male</MenuItem>
              <MenuItem value={"genderless"}>genderless</MenuItem>
              <MenuItem value={"unknown"}>unknown</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="character_list">
        {isLoaded ? (
          data.map((element) => {
            return (
              <CharacterCard
                name={element.name}
                image={element.image}
                onClick={() => {
                  setSelectedID(element)
                  setIsPopup(true)
                }}
              />
            )
          })
        ) : (
          <CircularProgress />
        )}
      </div>

      {isLoaded ? (
        <Pagination
          count={pageCount}
          defaultPage={1}
          onChange={handlePageChange}
          page={currentPage}
          color={'primary'}
        />
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  )
}
