import { Router, useRouter } from 'next/router';
import withAuth from '../../Components/withAuth';
import React,{useState,useEffect} from 'react'
import {Paper,TableContainer,Table,TableBody,TableCell,TableRow,TableHead,Pagination,InputBase,Button} from '@mui/material'




const Dashboard = ({data}) => {
  const router = useRouter()
  const logoutHandler = () =>{
    localStorage.removeItem('token')
    router.push(`/`)
  }
  
 
  console.log(data);
  return (
    <>
      <div style={{ height: 750 }}>
        
         <Button
type='button'
color='primary'
variant='contained'
onClick={logoutHandler}
>
  Logout
</Button>
       
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                 <TableCell>Created_at</TableCell>
                 <TableCell>Title</TableCell>
                 <TableCell>Author</TableCell>
                 <TableCell>URL</TableCell>
               
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((val,index) => {
                        return (
                          <TableRow
                            key={val.created_at_i}
                          >
                            <TableCell>{val.created_at}</TableCell>
                            <TableCell>{val.title}</TableCell>
                            <TableCell>{val.author}</TableCell>
                            <TableCell>{val.url} </TableCell>
                          </TableRow>
                        );
                      })
                 
                      }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

    </>
  );
};



  export default withAuth(Dashboard);

  export const getStaticProps = async() =>{
   
    const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`)
    const data =await res.json()
    return {
      props:{
        data:data.hits
      }
    }
  }