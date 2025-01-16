import {
  createListCollection,
  Flex,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";

export function BusinessSearchAndFilter({
  search,
  setSearch,
  searchParams,
  setSearchParams,
}) {
  /*검색타입*/
  const optionList = createListCollection({
    items: [
      { label: "사원번호", value: "number" },
      { label: "이름", value: "name" },
    ],
  });

  function handleSearchClick() {
    if (search.keyword.trim().length > 0) {
      // 검색
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.set("st", search.type);
      nextSearchParam.set("sk", search.keyword);
      nextSearchParam.set("page", 1);

      setSearchParams(nextSearchParam);
    } else {
      // 검색 안함
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.delete("st");
      nextSearchParam.delete("sk");

      setSearchParams(nextSearchParam);
    }
  }

  return (
    <Flex>
      {/*셀렉트 &&검색창*/}
      <SelectRoot
        collection={optionList}
        value={[search.type]}
        onValueChange={(sel) => {
          setSearch({ ...search, type: sel.value[0] });
        }}
        size="sm"
        width="200px"
      >
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent>
          {optionList.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      {/*검색창*/}
      <Input
        value={search.keyword}
        onChange={(e) =>
          setSearch({ ...search, keyword: e.target.value.trim() })
        }
      />
      <Button onClick={handleSearchClick}>검색</Button>
    </Flex>
  );
}
