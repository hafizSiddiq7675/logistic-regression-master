export const INITIAL_PYTHON_CODE = `import numpy as np

class Logistic_Regression():
    """
    A simple Logistic Regression classifier implemented from scratch.
    """

    # 1. Initialization Method
    # WHY: We need to set the 'hyperparameters' (settings that control learning)
    # before we even see the data.
    def __init__(self, learning_rate, no_of_iterations):
        # learning_rate: Controls how big of a step we take during optimization.
        # Too small = slow learning; Too big = might miss the optimal solution.
        self.learning_rate = learning_rate 
        
        # no_of_iterations: Controls how many times the model loops through the
        # entire dataset to learn. More iterations = more opportunities to refine weights.
        self.no_of_iterations = no_of_iterations

    # 2. Fit Method (Training)
    # WHY: This is where the model actually "learns" from the Training Data (X) and Labels (Y).
    def fit(self, X, Y):
        # WHY: We need the dimensions of the dataset to initialize parameters correctly.
        # m = number of data points (rows) -> needed for averaging gradients.
        # n = number of input features (columns) -> needed to know how many weights to create.
        self.m, self.n = X.shape 

        # WHY: Initialize weights (w) and bias (b) to starting values.
        # Weights (w): One weight for every feature. We start at 0 (no influence).
        self.w = np.zeros(self.n) 
        
        # Bias (b): The intercept (baseline). Starts at 0.
        self.b = 0

        # WHY: Store X and Y in 'self' so they can be accessed by other methods 
        # like 'update_weights' without passing them as arguments every time.
        self.X = X
        self.Y = Y

        # WHY: The Optimization Loop. We repeat the update process many times
        # to gradually minimize the error.
        for i in range(self.no_of_iterations):
            self.update_weights()

    # 3. Update Weights (Gradient Descent)
    # WHY: This is the core math. It calculates how wrong the model is and 
    # adjusts weights/bias to reduce that error.
    def update_weights(self):
        # A. The Linear Equation (Z = wX + b)
        # WHY: We combine inputs (X) with weights (w) and bias (b) to get a linear score.
        # dot product combines all features with their respective weights.
        Z = self.X.dot(self.w) + self.b 

        # B. The Sigmoid Function (Y_hat)
        # WHY: The linear score Z can be anything (-infinity to +infinity).
        # We need a probability between 0 and 1. The Sigmoid function forces this mapping.
        # Formula: 1 / (1 + e^-Z)
        Y_hat = 1 / (1 + np.exp(-Z)) 

        # C. Calculate Gradients (Derivatives)
        # WHY: We need to know the "slope" of the loss function to find the bottom (minimum error).
        
        # dw (Derivative of Weights):
        # Formula: (1/m) * X.T . (Predictions - Actual)
        # 1. (Y_hat - self.Y): Calculates the error (difference between prediction and reality).
        # 2. np.dot(self.X.T, ...): Correlates the error with the input features.
        #    If a feature was high and error was positive, we need to reduce that feature's weight.
        #    We transpose X (X.T) to align matrix dimensions for multiplication.
        # 3. (1 / self.m): Averages the gradient over all training examples so the step size 
        #    doesn't explode if we have more data.
        dw = (1 / self.m) * np.dot(self.X.T, (Y_hat - self.Y))

        # db (Derivative of Bias):
        # Formula: (1/m) * sum(Predictions - Actual)
        # WHY: Similar to dw, but bias isn't multiplied by input features X, 
        # so we just sum up the raw errors.
        db = (1 / self.m) * np.sum(Y_hat - self.Y)

        # D. Update Parameters
        # WHY: We move the weights in the *opposite* direction of the gradient.
        # If the slope (gradient) is positive, we decrease the weight.
        # If the slope is negative, we increase the weight.
        # The 'learning_rate' scales this step so we don't overshoot.
        self.w = self.w - self.learning_rate * dw
        self.b = self.b - self.learning_rate * db

    # 4. Predict Method (Inference)
    # WHY: Once trained, we use this to classify new, unseen data.
    def predict(self, X):
        # WHY: Calculate the probability using the learned weights and bias.
        # Same Sigmoid formula as in training.
        Y_pred = 1 / (1 + np.exp( - (X.dot(self.w) + self.b) )) 
        
        # WHY: Convert Probability to Class Label (0 or 1).
        # Logistic Regression outputs a probability (e.g., 0.85).
        # We generally use 0.5 as the threshold (Decision Boundary).
        # If probability > 0.5 -> Class 1 (e.g., Diabetic)
        # If probability <= 0.5 -> Class 0 (e.g., Non-Diabetic)
        Y_pred = np.where( Y_pred > 0.5, 1, 0)
        
        return Y_pred


# ========== TEST THE MODEL ==========

X = np.array([
    [2.5, 1.2],
    [1.0, 3.0],
    [3.5, 2.5],
    [2.0, 2.0],
    [4.0, 3.5],
    [1.5, 1.0],
    [3.0, 4.0],
    [0.5, 2.5],
])
Y = np.array([1, 0, 1, 0, 1, 0, 1, 0])

print("Training model...")
model = Logistic_Regression(learning_rate=0.1, no_of_iterations=1000)
model.fit(X, Y)

predictions = model.predict(X)

print("Learned weights:", model.w)
print("Learned bias:", model.b)
print("Predictions:", predictions)
print("Actual:     ", Y)
print("Accuracy:", np.mean(predictions == Y) * 100, "%")
`;

export const SKLEARN_PYTHON_CODE = `import numpy as np

# ============================================
# Using Built-in Functions from Library (sklearn)
# ============================================
# Now let's use scikit-learn (sklearn) library with its
# built-in functions to do the work for us

# Note: In this Pyodide environment, we'll simulate the sklearn workflow
# using NumPy since sklearn is not available. The code structure mirrors
# the sklearn API shown in the PDF slides.

# ============================================
# Step 1: Import Dependencies
# ============================================
# In a real environment, you would use:
# import pandas as pd
# from sklearn.preprocessing import StandardScaler
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LogisticRegression
# from sklearn.metrics import accuracy_score

print("=" * 50)
print("Simulating sklearn Logistic Regression Workflow")
print("=" * 50)

# ============================================
# Step 2: PIMA Diabetes Dataset (Sample)
# ============================================
# Original dataset has 768 rows and 9 columns:
# Pregnancies, Glucose, BloodPressure, SkinThickness,
# Insulin, BMI, DiabetesPedigreeFunction, Age, Outcome

# Sample data (subset for demonstration)
# Features: [Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age]
X = np.array([
    [6, 148, 72, 35, 0, 33.6, 0.627, 50],
    [1, 85, 66, 29, 0, 26.6, 0.351, 31],
    [8, 183, 64, 0, 0, 23.3, 0.672, 32],
    [1, 89, 66, 23, 94, 28.1, 0.167, 21],
    [0, 137, 40, 35, 168, 43.1, 2.288, 33],
    [5, 116, 74, 0, 0, 25.6, 0.201, 30],
    [3, 78, 50, 32, 88, 31.0, 0.248, 26],
    [10, 115, 0, 0, 0, 35.3, 0.134, 29],
    [2, 197, 70, 45, 543, 30.5, 0.158, 53],
    [8, 125, 96, 0, 0, 0.0, 0.232, 54],
    [4, 110, 92, 0, 0, 37.6, 0.191, 30],
    [10, 168, 74, 0, 0, 38.0, 0.537, 34],
    [10, 139, 80, 0, 0, 27.1, 1.441, 57],
    [1, 189, 60, 23, 846, 30.1, 0.398, 59],
    [5, 166, 72, 19, 175, 25.8, 0.587, 51],
])

# Target: Outcome (0 = Non-Diabetic, 1 = Diabetic)
Y = np.array([1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1])

print("\\nDataset Shape:", X.shape)
print("Number of samples:", X.shape[0])
print("Number of features:", X.shape[1])

# ============================================
# Step 3: Data Standardization
# ============================================
# StandardScaler: Standardize features by removing mean and scaling to unit variance
# Formula: z = (x - mean) / std

print("\\n--- Data Standardization ---")
print("Before standardization (first row):", X[0])

# Simulating StandardScaler
X_mean = np.mean(X, axis=0)
X_std = np.std(X, axis=0)
X_std[X_std == 0] = 1  # Avoid division by zero
X_standardized = (X - X_mean) / X_std

print("After standardization (first row):", np.round(X_standardized[0], 4))

# ============================================
# Step 4: Train Test Split
# ============================================
# Split data: 80% training, 20% testing
print("\\n--- Train Test Split ---")

# Simulating train_test_split with test_size=0.2
np.random.seed(2)  # random_state=2
indices = np.random.permutation(len(X_standardized))
test_size = int(0.2 * len(X_standardized))
test_indices = indices[:test_size]
train_indices = indices[test_size:]

X_train = X_standardized[train_indices]
X_test = X_standardized[test_indices]
Y_train = Y[train_indices]
Y_test = Y[test_indices]

print(f"Total samples: {len(X_standardized)}")
print(f"Training samples: {len(X_train)} (80%)")
print(f"Test samples: {len(X_test)} (20%)")

# ============================================
# Step 5: Training the Model
# ============================================
print("\\n--- Training the Model ---")

# Logistic Regression from scratch (mimicking sklearn API)
class LogisticRegressionSklearn:
    def __init__(self, learning_rate=0.01, no_of_iterations=1000):
        self.learning_rate = learning_rate
        self.no_of_iterations = no_of_iterations

    def fit(self, X, Y):
        self.m, self.n = X.shape
        self.w = np.zeros(self.n)
        self.b = 0
        self.X = X
        self.Y = Y

        for i in range(self.no_of_iterations):
            self.update_weights()
        return self  # sklearn returns self

    def update_weights(self):
        Z = self.X.dot(self.w) + self.b
        Y_hat = 1 / (1 + np.exp(-Z))
        dw = (1 / self.m) * np.dot(self.X.T, (Y_hat - self.Y))
        db = (1 / self.m) * np.sum(Y_hat - self.Y)
        self.w = self.w - self.learning_rate * dw
        self.b = self.b - self.learning_rate * db

    def predict(self, X):
        Y_pred = 1 / (1 + np.exp(-(X.dot(self.w) + self.b)))
        return np.where(Y_pred > 0.5, 1, 0)

# Create and train model (like sklearn)
classifier = LogisticRegressionSklearn(learning_rate=0.01, no_of_iterations=1000)
classifier.fit(X_train, Y_train)
print("Model trained successfully!")

# ============================================
# Step 6: Model Evaluation - Accuracy Score
# ============================================
print("\\n--- Model Evaluation ---")

# Predictions on training data
X_train_prediction = classifier.predict(X_train)
training_accuracy = np.mean(X_train_prediction == Y_train)
print(f"Accuracy score on Training data: {training_accuracy:.4f}")

# Predictions on test data
X_test_prediction = classifier.predict(X_test)
test_accuracy = np.mean(X_test_prediction == Y_test)
print(f"Accuracy score on Test data: {test_accuracy:.4f}")

# ============================================
# Step 7: Making a Predictive System
# ============================================
print("\\n--- Making a Predictive System ---")

# Input data for prediction (from PDF slide 62)
input_data = (5, 166, 72, 19, 175, 25.8, 0.587, 51)
print("Input data:", input_data)

# Convert to numpy array
input_data_as_numpy_array = np.asarray(input_data)

# Reshape for single prediction
input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

# Standardize the input data using same scaler
std_data = (input_data_reshaped - X_mean) / X_std
print("Standardized data:", np.round(std_data[0], 4))

# Make prediction
prediction = classifier.predict(std_data)
print("Prediction:", prediction[0])

if prediction[0] == 0:
    print("Result: The person is NOT diabetic")
else:
    print("Result: The person IS diabetic")

print("\\n" + "=" * 50)
print("sklearn workflow simulation complete!")
print("=" * 50)
`;