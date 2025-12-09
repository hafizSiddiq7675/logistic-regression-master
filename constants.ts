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