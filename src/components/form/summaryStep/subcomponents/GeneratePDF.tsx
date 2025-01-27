import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "../../../../features/redux/store";
import { IFormData, ISystems } from "../../../../features/interfaces";
import ReactDOMServer from "react-dom/server"; // For server-side rendering of React components
import FormSystemStep from "../../systemStep/FormSystemStep";
import SharedData from "./SharedData";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n, { t } from 'i18next';
import theme, { themeDark } from "../../../../theme";
import { Field, Form as FormikForm, Formik, FormikProps, FormikErrors, useFormik } from 'formik'
import validationSchema from "../../../../features/formValidation/formValidation";
import WorkTime from "../../systemStep/subcomponents/WorkTime";
import WorkConditions from "../../systemStep/subcomponents/WorkConditions";
import Loads from "../../systemStep/subcomponents/Loads";
import Capacity from "../../systemStep/subcomponents/Capacity";
import Flows from "../../systemStep/subcomponents/Flows";
import AdditionalRemarks from "../../systemStep/subcomponents/AdditionalRemarks";
import Building from "../../systemStep/subcomponents/Building";

export default function GeneratePDF() {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const formData = useSelector((state: RootState) => state.formData);

  const selectedSystems = useSelector((state: RootState) =>
    Object.entries(state.formData.present.system)
      .filter(([_, systemData]) => systemData.selected)
      .map(([systemName]) => systemName)
  ) as (keyof ISystems)[];

  async function generatePDF() {
    const pdf = new jsPDF();
    const pdfWidth = 190; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const margin = 10; // Page margin in mm

    // Create a hidden container for rendering content
    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "absolute";
    hiddenContainer.style.top = "-10000px";
    hiddenContainer.style.left = "-10000px";
    hiddenContainer.style.width = `${pdfWidth}mm`;
    hiddenContainer.style.display = "block";
    document.body.appendChild(hiddenContainer);

    // Add static data to the hidden container
    hiddenContainer.innerHTML += ReactDOMServer.renderToString(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          <Provider store={store}>
            <Formik
              initialValues={formData.present}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={() => { }}
            >
              <FormikForm>
                <SharedData />
              </FormikForm>
            </Formik>
          </Provider>
        </ThemeProvider>
      </I18nextProvider>
    );

    // Add dynamic tabs to the hidden container
const selectedSystem = 'agv'
      const tabHTML = ReactDOMServer.renderToString(
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            <Provider store={store}>
              <Formik
                initialValues={formData.present}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={() => { }}
              >
                <FormikForm>
                  <WorkTime selectedSystem={selectedSystem} />
                  <WorkConditions selectedSystem={selectedSystem} />
                  <Loads selectedSystem={selectedSystem} />
                  <Building selectedSystem={selectedSystem} />
                  {(selectedSystem === 'agv' || selectedSystem === 'autovna') && <Flows selectedSystem={selectedSystem} />}
                  <AdditionalRemarks selectedSystem={selectedSystem} />
                </FormikForm>
              </Formik>
            </Provider>
          </ThemeProvider>
        </I18nextProvider>
      );

      const tabElement = document.createElement("div");
      tabElement.innerHTML = tabHTML;
      hiddenContainer.appendChild(tabElement);
    

    // Use html2canvas to render the container to a canvas
    const canvas = await html2canvas(hiddenContainer, {
      useCORS: true,
      scale: 2, // High resolution
    });

    // Calculate dimensions for PDF pages
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    const totalPages = Math.ceil(imgHeight / pdfHeight);

    // Add each page to the PDF
    for (let page = 0; page < totalPages; page++) {
      const pageY = -(page * pdfHeight * (canvas.width / pdfWidth));
      pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight, undefined, 'FAST');
      if (page < totalPages - 1) {
        pdf.addPage();
      }
    }

    // Clean up the hidden container
    document.body.removeChild(hiddenContainer);

    // Save the PDF
    pdf.save("tabs-data.pdf");
  }


  return (
    <Button onClick={() => generatePDF()}>Generate PDF</Button>
  );
}
