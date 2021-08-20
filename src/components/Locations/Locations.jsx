import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useState, useEffect } from "react"
import "./locations.css"
import Pagination from "@material-ui/lab/Pagination"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

export default function Locations() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const Url = `https://rickandmortyapi.com/api/location/?page=${currentPage}`
  const [pageCount, setPageCount] = useState(1)
  const [nameValue, setNameValue] = React.useState("")
  const [dimensionValue, setDimensionValue] = React.useState("")
  const [typeValue, setTypeValue] = React.useState("")

  useEffect(() => {
    handleFetch()
  }, [currentPage, nameValue, dimensionValue, typeValue])

  const handleFetch = () => {
    fetch(
      Url +
        "&name=" +
        nameValue +
        "&type=" +
        typeValue +
        "&dimension=" +
        dimensionValue
    )
      .then((response) => response.json())
      .then((body) => {
        setData([...body.results])
        setPageCount(body.info.pages)
      })
      .catch((error) => console.error("Error", error))
  }

  const handlePageChange = (object, page) => {
    setData([])
    setCurrentPage(page)
  }

  const handleNameChange = (event) => {
    setNameValue(event.target.value)
  }

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value)
  }

  const handleDimensionChange = (event) => {
    setDimensionValue(event.target.value)
  }

  return (
    <div className="main_episode_table">
      <div className="input_fields">
        <form>
          <label>
            Search by Name:
            <input type="text" name="name" onChange={handleNameChange} />
          </label>
          <label>
            Search by Type:
            <input type="text" name="type" onChange={handleTypeChange} />
          </label>
          <label>
            Search by Dimension:
            <input
              type="text"
              name="dimension"
              onChange={handleDimensionChange}
            />
          </label>
        </form>
      </div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="right">Dimension</StyledTableCell>
              <StyledTableCell align="right">Created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.dimension}</TableCell>
                <TableCell align="right">{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <Pagination
          count={pageCount}
          defaultPage={1}
          onChange={handlePageChange}
          page={currentPage}
          color={"primary"}
        />
      </div>
    </div>
  )
}
