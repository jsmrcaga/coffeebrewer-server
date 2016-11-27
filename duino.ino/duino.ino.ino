const int Vx = 26;
const int Vy = 25;
const int SW = 3;
void setup() {
  Serial.begin(9600);
  while(!Serial){
    
  }
  pinMode(10, OUTPUT);

  // joystick
//  pinMode(Vx, INPUT);
//  pinMode(Vy, INPUT);
//  pinMode(SW, INPUT);
}

void loop() {
  delay(200);
  if(Serial.available()){
    String incoming = Serial.readString();
    if(incoming == "ON"){
      Serial.write("Setting ON\n");
      digitalWrite(10, HIGH);
      delay(100);
      digitalWrite(10, LOW);
    } else if(incoming == "OFF"){
      Serial.write("Setting OFF\n");
      digitalWrite(10, LOW);
    } else {
      Serial.write("WHAT?\n");
    }
  }

//  Serial.print("Vx: ");
//  Serial.println(analogRead(Vx));
//  Serial.print("Vy: ");
//  Serial.println(analogRead(Vy));
//  Serial.print("SW: ");
//  Serial.println(digitalRead(SW));
}

