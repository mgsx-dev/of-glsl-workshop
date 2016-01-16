#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

float dot3(vec3 a, vec3 b)
{
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

float rand3(vec3 co){
    return fract(sin(dot(co, vec3(12.9898,78.233, 33.87637))) * 43758.5453) * 2.0 - 1.0;
}

float hermite(float t)
{
  return t * t * (3.0 - 2.0 * t);
}

float snoise3(vec3 co, float freq)
{
  vec3 v = co * vec3(freq, freq, freq); 
  float ix1 = floor(v.x);
  float iy1 = floor(v.y);
  float iz1 = floor(v.z);
  float ix2 = floor(v.x + 1.0);
  float iy2 = floor(v.y + 1.0);
  float iz2 = floor(v.z + 1.0);

  float fx = hermite(fract(v.x));
  float fy = hermite(fract(v.y));
  float fz = (fract(v.z));

  float mix1 = mix(mix(rand3(vec3(ix1, iy1, iz1)), rand3(vec3(ix2, iy1, iz1)), fx), mix(rand3(vec3(ix1, iy2, iz1)), rand3(vec3(ix2, iy2, iz1)), fx), fy);
  float mix2 = mix(mix(rand3(vec3(ix1, iy1, iz2)), rand3(vec3(ix2, iy1, iz2)), fx), mix(rand3(vec3(ix1, iy2, iz2)), rand3(vec3(ix2, iy2, iz2)), fx), fy);

  return mix(mix1, mix2, fz);
}

float pnoise3(vec3 co, float freq, int steps, float persistence)
{
  float value = 0.0;
  float ampl = 1.0;
  float sum = 0.0;
  for(int i=0 ; i<steps ; i++)
  {
    sum += ampl;
    value += snoise3(co, freq) * ampl;
    freq *= 2.0;
    ampl *= persistence;
  }
  return value / sum;
}


void main( void ) {

	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 

	float value = pnoise3(vec3(pos * cur.x, time * 0.01), 100.0, 3, 0.5);

  	float lum = value * 0.5 + 0.5;

    gl_FragColor = vec4(lum,lum,lum,1.0);

}

