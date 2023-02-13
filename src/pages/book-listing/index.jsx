import React, { useEffect, useMemo, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { productListingStyle } from "./style";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from "@material-ui/core";
import { useAuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../utils/enum";
import Shared from "../../utils/shared";
import { useCartContext } from "../../context/cart";
import { defaultFilter } from "../../constant/constant";
import bookService from "../../service/book.service";
import categoryService from "../../service/category.service";

const BookList = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const [bookList, setBookList] = useState({
    records: [],
    totalRecords: 0,
  });
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState(defaultFilter);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookList(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll({ pageIndex: 0 }).then((res) => {
      if (res) {
        setCategories(res.records);
      }
    });
  };

  const books = useMemo(() => {
    if (bookList?.records) {
      bookList?.records.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList.records;
    }
    return [];
  }, [categories, bookList]);

  const addToCart = (book) => {
    if (!authContext.user.id) {
      toast.error("Please login before adding books to cart");
      navigate(RoutePaths.Register);
      return;
    } else {
      Shared.addToCart(book, authContext.user.id).then((res) => {
        if (res.error) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          cartContext.updateCart();
        }
      });
    }
  };

  const sortBooks = (e) => {
    setSortBy(e.target.value);
    bookList.records.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <Typography variant="h1">Book Listing</Typography>
        <Grid container className="title-wrapper">
          <Grid item xs={6}>
            <Typography variant="h2">
              Total
              <span> - {bookList.totalRecords} items</span>
            </Typography>
          </Grid>
          <div className="dropdown-wrapper">
            <TextField
              id="text"
              className="dropdown-wrapper"
              name="text"
              placeholder="Search..."
              variant="outlined"
              inputProps={{ className: "small" }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
          </div>
          <FormControl className="dropdown-wrapper" variant="outlined">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select
              className={materialClasses.customSelect}
              MenuProps={{
                classes: { paper: materialClasses.customSelect },
              }}
              onChange={sortBooks}
              value={sortBy}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            {books.map((book) => (
              <div className="product-list">
                <div className="product-list-inner">
                  <em>
                    <img
                      src={book.base64image}
                      className="image"
                      alt="dummyimage"
                    />
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3">{book.name}</Typography>
                    <span className="category">{book.category}</span>
                    <p className="description">{book.description}</p>
                    <p className="price">
                      <span className="discount-price">
                        MRP &#8377; {book.price}
                      </span>
                    </p>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation">
                      <span
                        className="MuiButton-label"
                        onClick={() => addToCart(book)}
                      >
                        ADD TO CART
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination-wrapper">
          <Pagination
            count={Math.ceil(
              (bookList?.records.length ? bookList.totalRecords : 0) / 10
            )}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookList;
