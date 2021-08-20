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
import "./Episodes.css"
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

export default function Episodes() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const Url = `https://rickandmortyapi.com/api/episode/?page=${currentPage}`
  const [pageCount, setPageCount] = useState(1)
  const [nameValue, setNameValue] = React.useState("")

  useEffect(() => {
    handleFetch()
  }, [currentPage, nameValue])

  const handleFetch = () => {
    fetch(Url + "&name=" + nameValue)
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

  const handleChange = (event) => {
    console.log(event.target.value)
    setNameValue(event.target.value);
  }

  return (
    <div className="main_episode_table">
      <div>
        <form  className="input_fields">
          <label>
            Name:
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </form>
      </div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Air Date</StyledTableCell>
              <StyledTableCell align="right">Episode</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.air_date}</TableCell>
                <TableCell align="right">{row.episode}</TableCell>
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
