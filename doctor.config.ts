// Schema: https://react.doctor/schema/config.json
//
// react-doctor flags three.js material/geometry/light props (clearcoat,
// attach, object, material, renderOrder, intensity, iridescence, etc.) as
// unknown DOM properties. These are valid props on R3F custom JSX elements
// (meshPhysicalMaterial, primitive, ambientLight, …) type-checked via the
// @react-three/fiber JSX namespace augmentation. The rule's DOM-centric
// heuristic does not understand R3F, so we scope the suppression to the
// three files that legitimately use these props.
//
// `defineConfig` from `react-doctor/api` is omitted because the package is
// invoked via `npx` (not installed in node_modules), so the import would
// fail `tsc --noEmit`. react-doctor accepts a plain default-exported object
// with the same shape (equivalent to `doctor.config.json`).
const reactDoctorConfig = {
  ignore: {
    overrides: [
      {
        files: [
          "components/IDCardModel.tsx",
          "components/IDCardLanyard.tsx",
          "components/IDCardScene.tsx",
        ],
        rules: ["react-doctor/no-unknown-property"],
      },
    ],
  },
};

export default reactDoctorConfig;
