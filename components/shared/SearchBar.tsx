"use client";
import { Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ searchType }: { searchType: string }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (search) {
      router.push(`/${searchType}?q=` + search);
    } else {
      router.push(`/${searchType}`);
    }
  }, [search, searchType, router]);

  return (
    <form>
      <TextInput
        id="SearchBar"
        placeholder="Search"
        required
        rightIcon={AiOutlineSearch}
        type="email"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </form>
  );
};

export default SearchBar;
