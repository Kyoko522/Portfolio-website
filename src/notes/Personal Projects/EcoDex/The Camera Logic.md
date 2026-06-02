Here’s the breakdown of the camera logic and button behavior in **Markdown format** so you can add it to your notes:

  

**Vision Page Logic Breakdown**

  

**1. State Variables**

  

**State Variable** **Purpose**

cameraMode Toggles camera ON (true) or OFF (false).

capturedImage Stores the base64-encoded image captured from the camera.

formik.values.image_url Holds the user-entered image URL for analysis.

loading Manages the loading spinner visibility when processing requests.

error Stores error messages when something goes wrong.

response Holds the API response after form submission.

videoRef Ref to the <video> element used to display the camera feed.

  

**2. Camera Logic**

  

**Button: Open Camera / Close Camera**

  

**Condition** **Button Shown** **Action**

cameraMode === false **“Open Camera”** Starts the camera and shows the video feed.

cameraMode === true **“Close Camera”** Stops the camera and hides the video feed.

  

• handleCameraToggle():

• If the camera is **OFF**:

• Requests access to the camera using navigator.mediaDevices.getUserMedia.

• Displays the camera feed in the <video> element.

• If the camera is **ON**:

• Stops the video stream by stopping all tracks.

  

**Button: Capture Image**

  

**Condition** **Button Shown** **Action**

cameraMode === true **“Capture Image”** Captures a frame from the camera feed.

  

• handleCapture():s


1. Captures a frame from the <video> element.

2. Converts the frame into a base64-encoded image using a <canvas>.

3. Stores the image in capturedImage.

4. Turns off the camera by setting cameraMode to false.

  

**3. Conditional Screen Display**

  

The content of the screen dynamically changes based on the following conditions:

  

**Condition** **What is Displayed**

cameraMode === true The **live video feed** from the camera.

capturedImage is set The **captured image** is displayed.

formik.values.image_url is set The **image from the URL** is displayed.

Default (none of the above) Placeholder: “Waiting for URL or Camera…”.

  

**4. Buttons and Visibility**

  

**Button** **Condition** **Action**

**Open Camera** cameraMode === false Turns ON the camera and shows the video feed.

**Close Camera** cameraMode === true Turns OFF the camera and stops the video feed.

**Capture Image** cameraMode === true Captures a frame from the camera.

**Analyze (Submit)** Always visible Submits the image URL or captured image for analysis.

  

**5. Text Field Visibility**

  

The **text field** for entering the image URL is **only visible when the camera is OFF**.

  

{!cameraMode && (

    <textarea

        name="image_url"

        placeholder="Enter image URL"

        value={formik.values.image_url}

        onChange={formik.handleChange}

        onBlur={formik.handleBlur}

        className="textarea"

    />

)}

  

**6. Form Validation**

• Form validation is managed using **Formik** and **Yup**:

• The image_url must be a valid URL.

• Errors are displayed only if:

• The field is **touched**.

• The value is **invalid**.

  

{formik.touched.image_url && formik.errors.image_url && !cameraMode && (

    <div className="error-container">

        <FaExclamationCircle /> {formik.errors.image_url}

    </div>

)}

  

**7. Flow of Logic**

1. **Initial State**:

• The **text field** and “Open Camera” button are visible.

• The “Analyze” button is also visible.

2. **Open Camera**:

• The **cameraMode** is set to true.

• The text field is **hidden**.

• “Open Camera” changes to **“Close Camera”**.

• “Capture Image” button appears.

3. **Capture Image**:

• A frame from the video feed is captured.

• The image is displayed on the screen.

• The camera is turned **OFF**.

4. **Image Submission**:

• The user submits the form, and the image URL (or captured image) is sent to the backend API.

• The response is displayed or an error is shown.

  

**Summary Table of Conditions**

  

**State** **Displayed Content** **Buttons**

cameraMode === true **Video Feed** “Close Camera”, “Capture Image”

capturedImage exists **Captured Image** “Analyze”

formik.values.image_url **Image from URL** “Analyze”

Default Placeholder: “Waiting…” “Open Camera”, “Analyze”

  

This structured breakdown clearly explains the logic behind the camera behavior, buttons, and screen content based on the state.