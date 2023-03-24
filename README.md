# react-mutable-state

react-mutable-state is just a simple typesafe wrapper around `useState` that lets you conveniently modify mutable objects.

The most common use case of this would be to use a `Set` in local component state. Imagine we stored a set of favorited items like so:

```tsx
const [favoritedItems, setFavoritedItems] = useState(new Set<string>(["item1", "item2"]));
```

In order to add to/remove from `favoritedItems` and trigger a re-render you would have to do something like this:

```tsx
// Add item3 to favoritedItems
setFavoritedItems((prevState) => new Set([...prevState, "item3"]));

// Remove item2 from favoritedItems
setFavoritedItems((prevState) => new Set([...prevState].filter((item) => item != "item2")));
```

This is way too much for some simple set operations. You would think you can just do something like this:


```tsx
// Add item3 to favoritedItems
setFavoritedItems((prevState) => prevState.add("item3"));
```

but you can't because from React's perspective the set is unchanged and it won't re-render the component. This is where `react-mutable-state` comes in! You can do exactly as you'd expect just by changing `useState` to `useMutableState` like so:

```tsx
import { useMutableState } from "react-mutable-state";

const [favoritedItems, setFavoritedItems] = useMutableState(new Set<string>(["item1", "item2"]));

// Add item3 to favoritedItems
setFavoritedItems((prevState) => prevState.add("item3"));

// Remove item3 from favoritedItems
setFavoritedItems((prevState) => prevState.delete("item3"));
```

`useMutableState` can also be used for any other mutable data structure like objects and arrays! It also behaves exactly as you would expect `useState` to as it's just a superset of it. Hopefully the resulting code is a lot more clear and straightforward.
