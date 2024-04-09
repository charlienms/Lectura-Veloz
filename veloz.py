import PDFplumber

with PDFplumber.open("TesisFinal2023.PDF") as temp:
    first_page = temp.pages[0]
    print(first_page.extract_text())

