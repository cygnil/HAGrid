# Documentation

# About the Grid

Normally I would have used the excellent [TanStack Table](https://tanstack.com/table/latest) which would give us easy sorting, filtering, cell resize, and all sorts of other great things for free, but that seemed against the spirit of the assignment ("Design and implement a pluggable system for custom cell renderers") so I regretfully had to passs on it.

One particularly insidious thing that TanStack Table does well which this won't is handle extremely large amounts of data. Because TanStack is virtualized, it can let users speedily scroll through tens or hundreds of thousands of rows. The tradeoff is that it has to render the table rows as divs instead of the more accessible-friendly table/tr/td paradigm, but for most modern web applications this is perfectly fine.