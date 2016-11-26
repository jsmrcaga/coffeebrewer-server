void setup() {
  Serial.begin(9600);
  while(!Serial){
    
  }
  pinMode(13, OUTPUT);
  pinMode
}

void loop() {
  if(Serial.available()){
    String incoming = Serial.readString();
    if(incoming == "ON"){
      digitalWrite(13, HIGH);
      delay(100);
      digitalWrite(13, LOW);
    } else if(incoming == "OFF"){
      digitalWrite(13, LOW);
    } else {
      Serial.write("WHAT?\n");
    }
  }
}

