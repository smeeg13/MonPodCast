import Head from "next/head";
import { Container, Typography, List, ListItem } from "@material-ui/core";

const categories = ["Science", "Technology", "Art", "History"];

const CategoriesPage = () => {
  return (
    <>
      <Head>
        <title>Categories Page</title>
      </Head>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((category, index) => (
            <ListItem key={index}>{category}</ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default CategoriesPage;
