import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import girlscoutstable from './girlscoutstable.png'
import natureMainBackgroundPic from './natureMainBackgroundPic.jpg'
import carmelCookie from "../pictures/carmelCookie.png"
import facts from "./facts.png"
import leader from "./leader.png"
import outfront from "./outfront.png"
const sections = [
  { title: 'Cookies', url: '/cookies' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' }
];

const mainFeaturedPost = {
  title: 'Welcome to a functional girlscouts webpage for local scouts!',
  description:
    "This is a webpage for local teams that wish to track their sales and progress. It's a great way to keep track of your sales and see how well your team is doing!",
  image: natureMainBackgroundPic,
  imageText: 'main image description',
};

const featuredPosts = [
  {
    title: 'Graph of all sales',
    description:
      'Click here to see the graph of all sales and how well your scout is doing!',
    image: girlscoutstable,
    imageLabel: 'girl scouts table',
    link: '/sales',
  },
  {
    title: 'Learn more about cookies',
    description:
    'To learn more about the cookies nutrition facts and ingredients:',
    image: facts,
    imageLabel: 'thin mints nutrition facts',
    link: '/cookies',
  },
  {
    title: 'Scout Leaders',
    description:
      'If you are a scout leader looking to add a scout or a location coming up, click below',
    image: leader,
    imageLabel: 'girl scout leader',
    link: '/create',
  },
  {
    title: 'Locations to Buy Cookies!',
    description:
      'Looking to find a location to buy cookies? Click below to find a location near you!',
    image: outfront,
    imageLabel: 'Locations to buy cookies',
    link: '/locations',
  },
];
const post1 = { post: 'This is a wider card with supporting text below as a natural lead-in to additional content.' };
const post2 = { post: 'This is a wider card with supporting text below as a natural lead-in to additional content.'};
const post3 = { post: 'This is a wider card with supporting text below as a natural lead-in to additional content.'};

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
}
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
          <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Girl scout cookies"
      />
    </ThemeProvider>
  );
}