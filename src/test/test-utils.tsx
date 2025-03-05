import { ReactElement } from "react"
import { render as rtlRender } from "@testing-library/react"

// Add any providers here
function render(ui: ReactElement) {
  return rtlRender(ui)
}

// re-export everything
export * from "@testing-library/react"
export { render }
